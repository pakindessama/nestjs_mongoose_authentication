/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as express from 'express';
import { AppModule } from './app/app.module';
import { logger } from './common/middleware/logger.middleware';
import { TransformInterceptor } from './common/interceptor/transform.interceptor';
// import { HttpExceptionFilter } from './common/exception/http.exception';
// import { AllExceptionsFilter } from './common/exception/all.exception';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import {ValidationPipe} from './common/pipe/validation.pipe';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from './app/guards/auth.guard';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(express.json()); // For parsing application/json
  app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
  app.use(logger);    
  app.useGlobalInterceptors(new TransformInterceptor());  
   app.useGlobalPipes(new ValidationPipe());

  app.enableCors();   
  const reflector = app.get(Reflector);
  app.useGlobalGuards(new AuthGuard(reflector)); 

  const options = new DocumentBuilder()
      .setTitle('jiji app admin auth')
      .setDescription('The jiji app nest main API description')
      .setVersion('1.0')
      .addTag('jiji app nest main')
      .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT || 3337;
  await app.listen(port, () => {
    Logger.log('Listening at http://localhost:' + port);
  });
}

bootstrap();
