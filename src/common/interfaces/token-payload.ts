export interface TokenPayloadDescription {
  userId: string;
  username: string;
  email: string;
  name: string;
  permissions: unknown;
  lastChangePasswordTime: Date;
}
