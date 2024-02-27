import { Transform, TransformFnParams } from 'class-transformer';
import { applyDecorators } from '@nestjs/common';

const EMPTY_STRING = '';

export const StandardizeString = ({
  toLowerCase = false,
  escapePercentage = true,
}: {
  toLowerCase?: boolean;
  escapePercentage?: boolean;
}) => {
  return applyDecorators(
    Transform(({ value }: TransformFnParams) => {
      if (typeof value !== 'string') return EMPTY_STRING;

      let result = value.trim();
      if (escapePercentage) result = result.replace('%', '\\%');
      if (toLowerCase) result = result.toLowerCase();
      return result;
    })
  );
};
