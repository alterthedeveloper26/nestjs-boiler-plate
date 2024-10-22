import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { ClsService } from 'nestjs-cls';

import { ApiResponseModel } from '~base/base.response';
import { PostgresErrorCodeEnum } from '~common/constants/database';
import {
  DATA_LOCKED_ERR,
  FORBIDDEN_REQUEST,
  INTERNAL_SERVER_ERR,
  UNAUTHORIZED
} from '~common/constants/messages';
import { LoggerService } from '~shared/logger/logger.service';

interface CustomPostgresError extends Error {
  code?: string;
}

@Catch()
export class ExceptionsFilter implements ExceptionFilter {
  constructor(
    private readonly httpAdapterHost: HttpAdapterHost,
    private readonly loggerService: LoggerService,
    private readonly clsService: ClsService
  ) {}

  catch(exception: CustomPostgresError, host: ArgumentsHost): void {
    // In certain situations `httpAdapter` might not be available in the
    // constructor method, thus we should resolve it here.
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();
    const req = ctx.getRequest();
    const correlationId = this.clsService.getId() || 'e001';

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const responseBody: Partial<ApiResponseModel> = {
      success: false,
      correlationId
    };

    if (exception instanceof HttpException) {
      const responseData = exception.getResponse() as ApiResponseModel;
      responseBody.result = responseData.result;
      responseBody.message = responseData.message;
    } else {
      responseBody.message = INTERNAL_SERVER_ERR;

      if (
        exception?.code === PostgresErrorCodeEnum.SERIALIZATION_FAILURE ||
        exception?.code === PostgresErrorCodeEnum.DEADLOCK_DETECTED
      ) {
        responseBody.message = DATA_LOCKED_ERR;
      }
    }

    this.loggerService.error(
      host,
      JSON.stringify(responseBody.message),
      exception,
      {
        ...responseBody
      }
    );

    const requestInfo = req.requestInfo;
    if (requestInfo) {
      const requestPath = `${req.method} ${req.url}`;

      this.loggerService.requestInfo(host, requestPath, {
        ...requestInfo,
        durations: new Date().getTime() - requestInfo.receivedAt
      });
    }

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
