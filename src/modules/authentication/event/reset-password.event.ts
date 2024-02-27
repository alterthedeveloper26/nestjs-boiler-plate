// import { EventProps } from '@bluesg-2/sqs-event';
// import { User } from '~models/user/entities/user.entity';
// import { RequestContext } from '~shared/request-context/request.context';

// export const RESET_PASSWORD_EVENT_NAME = 'reset_admin_user_password';

// export interface ResetPasswordPayload {
//   name: string;
//   password: string;
//   username: string;
//   email: string;
// }

// export class ResetPasswordEvent implements EventProps<ResetPasswordPayload> {
//   readonly event: string = RESET_PASSWORD_EVENT_NAME;
//   correlationId?: string;
//   payload: ResetPasswordPayload;

//   constructor(correlationId: string, payload: ResetPasswordPayload) {
//     this.correlationId = correlationId;
//     this.payload = payload;
//   }

//   public static from(
//     user: Partial<User>,
//     newPassword: string,
//     correlationId: string = RequestContext?.currentContext()?.getCorrelationId()
//   ): ResetPasswordEvent {
//     return new ResetPasswordEvent(correlationId, {
//       name: user.name,
//       password: newPassword,
//       email: user.email,
//       username: user.username,
//     });
//   }
// }
