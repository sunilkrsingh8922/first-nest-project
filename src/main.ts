import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('NestJS API')
    .setDescription('Auto-generated Swagger documentation')
    .setVersion('1.0')
    .addTag('API') // Optional grouping
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // Swagger UI will be served at /api

  await app.listen(3000, '0.0.0.0');
  Logger.log("✅ Application running on port 3000");
  console.log("🌐 Swagger UI available at /api");
}
bootstrap();
