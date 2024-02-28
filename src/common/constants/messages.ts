export const UNAUTHORIZED = 'UNAUTHORIZED_ERR';
export const FORBIDDEN_REQUEST = 'FORBIDDEN_REQUEST_ERR';
export const INTERNAL_SERVER_ERR = 'INTERNAL_SERVER_ERR';
export const DATA_LOCKED_ERR = 'DATA_LOCKED_ERR'; // Happen when there are 2 transactions at the same time, and isolation level is SERIALIZABLE
export const WRONG_PASSWORD = 'WRONG_PASSWORD!';
export const INVALID_CREDENTIAL = 'WRONG_USERNAME_OR_PASSWORD';
export const PASSWORD_NOT_CHANGED = 'PASSWORD_NOT_CHANGED';
export const INACTIVE_USER_LOGIN = 'INACTIVE_USER_LOGIN';

// NOTE: User service
export const USER_NOT_FOUND = 'User not found!';
export const USER_DUPLICATE_EMAIL_OR_USERNAME = 'Duplicate username or email!';

// NOTE: System error
export const HAVE_NOT_GET_INFO_FROM_TOKEN =
  'User token payload is not currently in request!';
