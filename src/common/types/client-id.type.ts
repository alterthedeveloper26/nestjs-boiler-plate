import { TinyType } from 'tiny-types';

export class ClientId extends TinyType {
  constructor(public readonly value: string) {
    super();
  }
}
