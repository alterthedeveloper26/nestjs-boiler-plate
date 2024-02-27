import { AxiosError } from 'axios';

import {
  BadRequestException,
  ForbiddenException,
  InternalServerErrorException,
  UnauthorizedException,
  UnprocessableEntityException,
  NotFoundException,
} from '@nestjs/common';
import { ApiResponseModel } from '~base/api-response-model.dto';

export class ResponseParser {
  public static parseError(err: AxiosError<ApiResponseModel>): Error {
    if (!err.response) return new InternalServerErrorException(err.message);

    const { message } = err.response.data;

    switch (err?.response?.status) {
      case 400:
        return new BadRequestException(message);
      case 401:
        return new UnauthorizedException(message);
      case 403:
        return new ForbiddenException(message);
      case 404:
        return new NotFoundException(message);
      case 422:
        return new UnprocessableEntityException(message);
      case 500:
        return new InternalServerErrorException(message);
      default:
        throw new Error(
          'Have not covered enough exception from external service!'
        );
    }
  }
}
