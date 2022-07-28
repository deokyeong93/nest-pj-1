import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); // 클래스 벨리데이션 사용을 위한 등록
  app.useGlobalFilters(new HttpExceptionFilter());
  const PORT = process.env.PORT;
  await app.listen(PORT);
}

bootstrap();
