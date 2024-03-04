import { Logger, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import * as nocache from 'nocache';
import { AppModule } from './app.module';
import { SwaggerSetup } from './swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);
  const serverConfig = configService.get('appConfig');

  app.setGlobalPrefix('api', {
    exclude: ['health']
  });

  app.enableVersioning({
    type: VersioningType.URI
  });

  app.enableCors();
  app.use(helmet());
  app.use(nocache());

  const swaggerSetup = new SwaggerSetup();
  swaggerSetup.install(app);

  await app.listen(serverConfig.port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${serverConfig.port}/swagger`
  );
}
bootstrap();
