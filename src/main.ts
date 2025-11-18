import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import passport from 'passport';
import session from 'express-session';
import { NextFunction } from 'express';
import { constant } from './config/constant/constant.config';
import { ResponseInterceptor } from './interceptor/response.interceptor';
import { HttpExceptionFilter } from './interceptor/error.interceptro';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      stopAtFirstError: true,
      transformOptions: { enableImplicitConversion: true },
      validationError: { target: false, value: false },
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        const validationErrorsMap = {};
        for (const { property, constraints } of validationErrors)
          if (constraints) {
            validationErrorsMap[property] = Object.values(constraints);
          }
        console.log('in error', JSON.stringify(validationErrorsMap));
        return new BadRequestException({
          message: 'Invalid input',
          details: validationErrorsMap,
        });
      },
    }),
  );
  app.use(
    session({
      resave: false,
      saveUninitialized: false,
      secret: constant.JWT_CONFIG.USER_JWT_SECRET,
    }),
  );

  app.use(passport.initialize());
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.use(helmet());
  app.use(passport.session());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
