import { hash, compare } from 'bcrypt';
import { password } from '~common/interfaces';

export class HashHelper {
  static async hash(password: string, saltRounds: number): Promise<string> {
    return await hash(password, saltRounds);
  }

  static async verify(password: password, hash: string): Promise<boolean> {
    return await compare(password, hash);
  }
}
