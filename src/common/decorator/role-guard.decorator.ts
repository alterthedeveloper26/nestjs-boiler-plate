import { applyDecorators, UseGuards } from '@nestjs/common';
import {
  RolesGuard,
  ResourceMetadata,
  IResourceMetaData,
} from '@bluesg-2/bo-auth-guard';

export const GuardOn = (guardInfo: IResourceMetaData) => {
  return applyDecorators(ResourceMetadata(guardInfo), UseGuards(RolesGuard));
};
