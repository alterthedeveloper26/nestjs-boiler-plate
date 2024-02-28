import { hash, compare } from 'bcrypt';
import { password } from '~common/types';

export class HashHelper {
  static async hash(password: string, saltRounds: number): Promise<string> {
    return await hash(password, saltRounds);
  }

  static async verify(password: password, hash: string): Promise<boolean> {
    return await compare(password, hash);
  }
}
