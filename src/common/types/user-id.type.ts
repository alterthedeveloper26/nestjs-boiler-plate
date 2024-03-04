import { TinyType } from 'tiny-types';

export class UserId extends TinyType {
  constructor(public readonly value: string) {
    super();
  }
}
