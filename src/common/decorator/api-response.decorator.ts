import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, getSchemaPath } from '@nestjs/swagger';
import { ApiResponseModel } from '~base/base.response';
import { BasePaginationResponseDto } from '~base/dto/base-pagination-response.dto';

export const SwaggerApiResponseSchema = <T extends Type<unknown>>({
  model = null,
  isArray = false,
  primitiveDataType = null,
  shouldOmitPagination = true,
  havingMessage = false,
}: {
  model?: T;
  isArray?: boolean;
  primitiveDataType?: string;
  shouldOmitPagination?: boolean;
  havingMessage?: boolean;
}) => {
  let resultSchema: unknown = { default: null };

  if (model || primitiveDataType) {
    resultSchema = model
      ? { $ref: getSchemaPath(model) }
      : {
          type: primitiveDataType,
        };

    if (isArray) {
      resultSchema = {
        type: 'array',
        items: resultSchema,
      };
    }
  }

  return applyDecorators(
    model
      ? ApiExtraModels(ApiResponseModel, model)
      : ApiExtraModels(ApiResponseModel),
    ApiResponse({
      schema: {
        allOf: [
          {
            $ref: getSchemaPath(ApiResponseModel),
          },
          {
            properties: {
              result: resultSchema,
              pagination: shouldOmitPagination
                ? { default: null }
                : {
                    $ref: getSchemaPath(BasePaginationResponseDto),
                  },
              message: havingMessage
                ? {
                    type: 'string',
                  }
                : { default: null },
            },
          },
        ],
      },
    })
  );
};
