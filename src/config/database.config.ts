import { ConfigType, registerAs } from '@nestjs/config';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { getEnv, getEnvBoolean, getEnvNumber } from '~common/utils/env.util';

export const databaseConfig = registerAs(
  'databaseConfig',
  (): TypeOrmModuleOptions => ({
    type: getEnv('DB_TYPE') as 'postgres',
    host: getEnv('DB_HOST'),
    port: getEnvNumber('DB_PORT'),
    username: getEnv('DB_USERNAME'),
    password: getEnv('DB_PASSWORD'),
    database: getEnv('DB_NAME'),
    autoLoadEntities: true,
    synchronize: false,
    namingStrategy: new SnakeNamingStrategy(),
    logging: getEnvBoolean('DB_LOG_QUERY'),
    entities: ['dist/modules/**/*.entity.js'],
    migrationsTableName: 'migration_histories',
    ssl: getEnvBoolean('DB_SSL')
  })
);

export const connectionOptions = {
  useFactory: async (
    databaseConfiguration: ConfigType<typeof databaseConfig>
  ) => databaseConfiguration,
  inject: [databaseConfig.KEY]
};
