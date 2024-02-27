import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Logger } from 'winston';
import { getCorrelationId } from '~common/utils/get-correlation-id.utils';

import {
  CommonInfo,
  EventInfo,
  RequestInfo,
} from '~shared/logger/log-info-type.interface';
import { ArgumentsHost } from '@nestjs/common/interfaces';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

@Injectable()
export class LoggerService {
  protected readonly serviceMarkedPrefixMessage: string;

  public static readonly SENSITIVE_FIELDS = [
    'password',
    'newPin',
    'currentPin',
    'token',
    'newPassword',
    'currentPassword',
    'documentNumber',
  ];

  constructor(
    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly loggerInstance: Logger,
    private readonly configService: ConfigService,
  ) {
    this.serviceMarkedPrefixMessage = `[${this.configService.get<string>(
      'serviceName',
    )}] - `;
  }

  // Use for the end of the request
  public requestInfo(
    argumentHost: ArgumentsHost,
    prefix: string,
    data: RequestInfo = { correlationId: getCorrelationId(argumentHost) },
  ): void {
    if (!data.correlationId) {
      data.correlationId = getCorrelationId(argumentHost);
    }
    data.data = this.hideSensitive(data.data);
    this.loggerInstance.info(this.serviceMarkedPrefixMessage + prefix, data);
  }

  // use for the beginning of the execution
  public eventInfo(
    argumentHost: ArgumentsHost,
    prefix: string,
    data: EventInfo = { correlationId: getCorrelationId(argumentHost) },
  ): void {
    if (!data.correlationId) {
      data.correlationId = getCorrelationId(argumentHost);
    }
    data.data = this.hideSensitive(data.data);
    this.loggerInstance.info(this.serviceMarkedPrefixMessage + prefix, data);
  }

  // use for logging additional info
  public info(
    argumentHost: ArgumentsHost,
    prefix: string,
    optionalParams: CommonInfo = {
      correlationId: getCorrelationId(argumentHost),
    },
  ): void {
    // console.log(optionalParams);

    if (!optionalParams.correlationId) {
      optionalParams.correlationId = getCorrelationId(argumentHost);
    }
    this.loggerInstance.info(
      this.serviceMarkedPrefixMessage + prefix,
      this.hideSensitive(optionalParams),
    );
  }

  // use for debug
  public debug(
    argumentHost: ArgumentsHost,
    prefix: string,
    optionalParams: CommonInfo = {
      correlationId: getCorrelationId(argumentHost),
    },
  ): void {
    if (!optionalParams.correlationId) {
      optionalParams.correlationId = getCorrelationId(argumentHost);
    }
    this.loggerInstance.debug(
      this.serviceMarkedPrefixMessage + prefix,
      this.hideSensitive(optionalParams),
    );
  }

  // use for error handling
  public error(
    argumentHost: ArgumentsHost,
    prefix: string,
    error: Error,
    optionalParams: CommonInfo = {
      correlationId: getCorrelationId(argumentHost),
    },
  ): void {
    const wrappedError = this.parseError(error);

    if (!optionalParams.correlationId) {
      optionalParams.correlationId = getCorrelationId(argumentHost);
    }
    this.loggerInstance.error(this.serviceMarkedPrefixMessage + prefix, {
      message: wrappedError.message,
      stack: wrappedError.stack,
      ...this.hideSensitive(optionalParams),
    });
  }

  // use for warning
  public warn(
    argumentHost: ArgumentsHost,
    prefix: string,
    optionalParams: CommonInfo = {
      correlationId: getCorrelationId(argumentHost),
    },
  ): void {
    if (!optionalParams.correlationId) {
      optionalParams.correlationId = getCorrelationId(argumentHost);
    }
    this.loggerInstance.warn(
      this.serviceMarkedPrefixMessage + prefix,
      optionalParams,
    );
  }

  private parseError(error: Error): Error {
    if (error instanceof Error) {
      return error;
    }

    return new Error(JSON.stringify(error));
  }

  private hideSensitive(
    data: Record<string, unknown> = {},
  ): Record<string, unknown> {
    Object.keys(data).forEach((key) => {
      if (LoggerService.SENSITIVE_FIELDS.includes(key)) {
        data[key] = '**Censored**';
      }
      //To Refactor: Nested data?
      if (key === 'data') {
        data[key] = this.hideSensitive(data[key] as Record<string, unknown>);
      }
    });
    return data;
  }
}
