import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { CustomLogger } from 'commom/logger';
import { GlobalExceptionFilter } from 'filters/exception.filter';
import { LoggingInterceptor } from 'interceptors/logging.interceptor';
import { ResponseInterceptor } from 'interceptors/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true, // make sure all logs will be buffered until a custom logger is attached
  });
  app.useGlobalFilters(new GlobalExceptionFilter());
  app.useLogger(new CustomLogger());
  app.useGlobalInterceptors(
    new LoggingInterceptor(),
    new ResponseInterceptor(),
  );
  await app.listen(3000);
}
bootstrap();
