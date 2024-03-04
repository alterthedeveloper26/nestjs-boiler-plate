import { isDefined, isISO8601 } from 'class-validator';
import { TinyType } from 'tiny-types';
import { ensure } from 'tiny-types/lib/ensure';
import { Predicate } from 'tiny-types/lib/predicates';

function isValidISO8601(): Predicate<string> {
  return Predicate.to(
    'be a valid ISO8601 string',
    (value: string) => isDefined(value) && isISO8601(value)
  );
}

export class ISOString extends TinyType {
  constructor(public readonly value: string) {
    ensure(ISOString.name, value, isValidISO8601());
    super();
  }
}
