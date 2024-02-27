import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
  buildMessage,
} from 'class-validator';

export function IsNotDuplicatedWith<T>(
  property: keyof T,
  validationOptions?: ValidationOptions
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'isNotDuplicatedWith',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const relatedValue = (args.object as T)[property];

          return relatedValue !== value;
        },
        defaultMessage: buildMessage(
          () => `${propertyName} must be different from ${String(property)}`
        ),
      },
    });
  };
}
