import { Injectable, NotFoundException } from '@nestjs/common';
import { Brackets, DataSource, FindOneOptions, Repository } from 'typeorm';
import { UserServiceErrorMessage } from '~common/constants/message/user-service-message.constant';
import { UserNotFoundError } from '~common/errors/user/user-not-found.error';
import {
  defaultExcludedKeys,
  getAllColumnKeys,
  ModelKeys,
} from '~common/utils/get-all-column-keys.util';
import {
  createPaginationResponse,
  appendPagination,
} from '~common/utils/pagination.util';
import { GetUserListDto } from './dto/get-user-list.dto';
import { User } from './entities/user.entity';
import { ApiResponseModel } from '~base/base.response';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async isUserNameOrEmailExist(
    username: string,
    email: string,
    ignoreId = ''
  ): Promise<boolean> {
    const countQuery = this.createQueryBuilder()
      .where(
        new Brackets((query) => {
          query
            .where('username = :username', { username })
            .orWhere('email = :email', { email });
        })
      )
      .withDeleted();

    if (ignoreId) {
      countQuery.andWhere('id != :id', {
        id: ignoreId,
      });
    }

    return (await countQuery.getCount()) > 0;
  }

  async findOneByUserNameOrEmail(input: string): Promise<User> {
    const user = await this.findOne({
      where: [{ username: input }, { email: input }],
      relations: ['roles', 'roles.permissions'],
      select: getAllColumnKeys(this, defaultExcludedKeys),
    });

    if (!user)
      throw new NotFoundException(UserServiceErrorMessage.UserNotFound);

    return user;
  }

  async findAnUserById(
    id: string,
    {
      withDeleted = false,
      relationIdsLoaded = false,
      relationFullInfoLoad = false,
      excludeFields = defaultExcludedKeys as ModelKeys<User>,
      includeFields = [],
      throwIfNotFound = true,
    }: {
      withDeleted?: boolean;
      relationIdsLoaded?: boolean;
      relationFullInfoLoad?: boolean;
      excludeFields?: ModelKeys<User>;
      includeFields?: ModelKeys<User>;
      throwIfNotFound?: boolean;
    } = {
      throwIfNotFound: true,
    }
  ): Promise<User> {
    if (!excludeFields.length) excludeFields.push(...defaultExcludedKeys);

    const condition: FindOneOptions<User> = {
      where: {
        id,
      },
      withDeleted: withDeleted ?? false,
      select: [
        ...includeFields,
        ...getAllColumnKeys<User>(this, [...excludeFields]),
      ],
    };

    if (relationIdsLoaded) {
      condition.loadRelationIds = {
        relations: ['roles'],
      };
    }

    if (relationFullInfoLoad) {
      condition.relations = ['roles', 'roles.permissions'];
    }

    const entity = await this.findOne(condition);

    if (!entity && throwIfNotFound) throw new UserNotFoundError();

    return entity;
  }

  async findAndPaginateWithCondition(
    queryParams: GetUserListDto
  ): Promise<ApiResponseModel<User[]>> {
    const { keyword, roleId, active } = queryParams;

    const query = this.createQueryBuilder('user')
      .leftJoinAndSelect('user.roles', 'role')
      .where('user.id IS NOT NULL');

    if (keyword) {
      query.andWhere(
        new Brackets((query) => {
          query
            .where('user.username ILIKE :username', {
              username: `%${keyword}%`,
            })
            .orWhere('user.email ILIKE :email', {
              email: `%${keyword}%`,
            })
            .orWhere('user.name ILIKE :name', { name: `%${keyword}%` })
            .orWhere('role.roleName ILIKE :roleName', {
              roleName: `%${keyword}%`,
            });
        })
      );
    }

    if (roleId) {
      query.andWhere('role.id = :roleId', { roleId });
    }

    if (active) {
      query.andWhere('user.active = :active', { active });
    }

    const count = await query.getCount();
    appendPagination(query, queryParams, 'user');
    const result = await query.getMany();

    return {
      result,
      pagination: createPaginationResponse(queryParams, count),
      success: true,
    };
  }
}
