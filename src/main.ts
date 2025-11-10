import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('HomeCare API')
    .setDescription('Documentación de la API del proyecto HomeCare')
    .setVersion('1.0')
    .addBearerAuth() // Si usas autenticación JWT
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(3002);
  console.log(`🚀 Servidor corriendo en: http://localhost:3002`);
  console.log(`📘 Documentación Swagger: http://localhost:3002/api/docs`);
}

bootstrap();
