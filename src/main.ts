import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port=22;
  Logger.log("app is running on port " + port)
  await app.listen(port);
  console.log("hi now you");
}
bootstrap();
