import {
  Controller,
  ForbiddenException,
  Get,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';

import { ApiResponseModel } from '~base/base.response';

@Controller('health')
export class HealthController {
  @Get()
  healthCheck(): ApiResponseModel {
    throw new Error('Kissing ass');
    return {
      success: true,
    };
  }
}
