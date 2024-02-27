import { ThrottlerGuard, ThrottlerException } from '@nestjs/throttler';

export class CustomThrottlerGuard extends ThrottlerGuard {
  protected throwThrottlingException(): void {
    const customMessage = `You have request the api ${this.options.limit} times in a round! Please try again later!`;
    throw new ThrottlerException(customMessage);
  }
}
