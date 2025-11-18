import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { IResponse } from '../interface/response.interface';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const statusCode = exception.getStatus();
    const exceptionResponse = exception.getResponse();
    let details = {};

    if (exceptionResponse.details) details = exceptionResponse.details;

    const filteredException: IResponse<object> = {
      status: 'error',
      code: statusCode,
      message: exception.message,
      ...(details ? { details } : {}),
    };

    response.status(statusCode).json(filteredException);
  }
}
