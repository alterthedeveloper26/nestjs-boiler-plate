import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { PRODUCTION } from '~common/constants/system';
import { ExceptionsFilter } from '~common/filters/exception.filter';
import { LoggingInterceptor } from '~common/interceptors/logging.interceptor';
import { NewrelicInterceptor } from '~common/interceptors/newrelic.interceptor';
import { TransformInterceptor } from '~common/interceptors/format-http-response.interceptor';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);
  const serverConfig = configService.get('serverConfig');

  app.setGlobalPrefix('api', {
    exclude: ['health'],
  });

  app.enableVersioning({
    type: VersioningType.URI,
  });

  if (process.env.NODE_ENV !== PRODUCTION) {
    const options = new DocumentBuilder()
      .setTitle('BlueSG API')
      .setDescription('BlueSG API description')
      .setVersion('1.0')
      .addBearerAuth(
        {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          in: 'header',
        },
        'jwt'
      )
      .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('swagger', app, document);
  }

  await app.listen(serverConfig.port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${serverConfig.port}`
  );
}
bootstrap();
