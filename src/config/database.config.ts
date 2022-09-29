import { ConfigModule, ConfigService } from '@nestjs/config';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export const connectionOptions = {
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => {
    return {
      type: configService.get<string>('DB_TYPE') as 'postgres',
      host: configService.get<string>('DB_HOST'),
      port: configService.get<number>('DB_PORT'),
      username: configService.get<string>('DB_USERNAME'),
      password: configService.get<string>('DB_PASSWORD'),
      database: configService.get<string>('DB_NAME'),
      autoLoadEntities: true,
      synchronize: false,
      namingStrategy: new SnakeNamingStrategy(),

      //   authSource: configService.get<string>('DB_AUTH_SOURCE'),
    };
  },
  inject: [ConfigService],
};
