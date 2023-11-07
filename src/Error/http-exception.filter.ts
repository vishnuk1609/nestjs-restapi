import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    InternalServerErrorException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const res = ctx.getResponse<Response>();
        const req = ctx.getRequest<Request>();
        console.log(exception)// -------------------------  console.log
        const statusCode =
            exception instanceof InternalServerErrorException
                ? 500
                : exception.getStatus();
        const message =
            exception.getResponse().valueOf() || 'Internal server error';

        res.status(statusCode).json({
            staus: false,
            statusCode,
            message: message['message'].toString(),
            data: [],
        });
    }
}
