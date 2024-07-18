import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  // ** Add Validation Pipe
  app.useGlobalPipes(new ValidationPipe());

  // ** Add Swagger
  app.setGlobalPrefix('api/v1');

  const config = new DocumentBuilder()
    .setTitle('API')
    .setDescription('API docs')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  console.log(process.env.IS_PRODUCTION === 'false');
  console.log(
    'Boolean(process.env.IS_PRODUCTION)',
    Boolean(process.env.IS_PRODUCTION),
  );

  const port = process.env.IS_PRODUCTION === 'false' ? 3000 : 4000;
  await app.listen(port);
}
bootstrap();
