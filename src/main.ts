import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Orígenes permitidos: los locales más los que pongas en FRONTEND_URL
  // (puedes poner varios separados por coma)
  const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:5174',
    ...(process.env.FRONTEND_URL?.split(',').map((url) => url.trim()) ?? []),
  ];

  app.enableCors({
    origin: allowedOrigins,
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('HomeCare API')
    .setDescription('Documentación de la API del proyecto HomeCare')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT ?? 3002;
  await app.listen(port);
  console.log(`🚀 Servidor corriendo en el puerto ${port}`);
  console.log(`📘 Documentación Swagger: /api/docs`);
}

bootstrap();