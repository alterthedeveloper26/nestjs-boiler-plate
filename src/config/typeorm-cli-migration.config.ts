import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { DEVELOPMENT } from '~common/constants/system';

// DB_SSL_CERT is encode in base64 type
const ssl =
  process.env.DB_SSL && process.env.DB_SSL_CERT
    ? {
        ca: Buffer.from(process.env.DB_SSL_CERT, 'base64').toString(),
        rejectUnauthorized: false
      }
    : null;

export default new DataSource({
  type: process.env.DB_TYPE as 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  namingStrategy: new SnakeNamingStrategy(),
  logging: process.env.NODE_ENV === DEVELOPMENT,
  entities: ['dist/modules/**/*.entity.js'],
  migrations: ['src/migrations/*{.js,.ts}'],
  migrationsTableName: 'migration_histories',
  ssl
});
