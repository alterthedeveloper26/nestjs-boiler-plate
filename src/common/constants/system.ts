// Environment possible values
export const STAGING = 'staging';
export const PRODUCTION = 'production';
export const DEVELOPMENT = 'development';
export const TEST = 'test';
export const CORRELATION_ID_HEADER = 'x-correlation-id';

// Env file path
export const DEVELOPMENT_FILE_PATH = `.env.${DEVELOPMENT}`;
export const PRODUCTION_FILE_PATH = `.env`;
export const TEST_FILE_PATH = `.env.${TEST}`;

// Service
export const SERVICE_NAME = 'be-legacy-migration';
export const SERVICE_DEFAULT_PORT = 3004;

// AWS
export const AWS_DEFAULT_REGION = 'ap-southeast-1';
export const DEFAULT_SNS_MESSAGE_TIMEOUT = 5000;
export const AWS_DEFAULT_USING_CREDENTIAL = false;

// Database config
export const DEFAULT_DATABASE_TYPE = 'postgres';
export const DEFAULT_LOGGING_ENABLE = false;
export const DEFAULT_MIGRATION_TABLE_NAME = 'migration_histories';
