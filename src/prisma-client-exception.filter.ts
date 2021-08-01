import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    // Refer to Prisma API reference for the error codes
    // https://www.prisma.io/docs/reference/api-reference/error-reference#prisma-client-query-engine
    switch (exception.code) {
      case 'P2002':
        // return conflict response
        const status = HttpStatus.CONFLICT;
        const message = exception.message.replace(/\n/g, '');
        response.status(status).json({
          statusCode: status,
          message,
        });
        break;

      // TODO: catch other error codes (eg., 'P2000' or 'P2025')

      default:
        // default 500 error code
        super.catch(exception, host);
        break;
    }
  }
}
