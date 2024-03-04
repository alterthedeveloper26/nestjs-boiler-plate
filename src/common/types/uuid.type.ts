import { isDefined, isUUID } from 'class-validator';
import { TinyType } from 'tiny-types';
import { ensure } from 'tiny-types/lib/ensure';
import { Predicate } from 'tiny-types/lib/predicates';

function isValidUUID(): Predicate<string> {
  return Predicate.to(
    'be an uuid',
    (value: string) => isDefined(value) && isUUID(value)
  );
}

export class UUID extends TinyType {
  constructor(public readonly value: string) {
    ensure(UUID.name, value, isValidUUID());
    super();
  }
}
