import { ThrottlerGuard, ThrottlerException } from '@nestjs/throttler';

export class CustomThrottlerGuard extends ThrottlerGuard {
  protected async throwThrottlingException(): Promise<void> {
    const customMessage = `You have request the api ${this.options[0].limit} times in a round! Please try again later!`;
    throw new ThrottlerException(customMessage);
  }
}
