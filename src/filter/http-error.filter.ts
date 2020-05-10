import { Catch, ExceptionFilter, HttpException, ArgumentsHost } from '@nestjs/common';
import {CustomLogger} from '../core/logger/customLogger.service';
@Catch()
export class HttpErrorFilter implements ExceptionFilter {
   private logger;
    constructor() {
        this.logger = new CustomLogger('Exception Filter');
    }
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const request = ctx.getRequest();
        const response = ctx.getResponse();
        const status = exception.getStatus() || null;
        const error = exception.getResponse();
        const errorResponse = {
            code: status,
            timestamp: new Date().toLocaleDateString(),
            path: request.url,
            method: request.method,
            message: exception['message']['error'] || exception.message || null,
            error: error['error'] || null

        };
        // this.logger.error(`${errorResponse.method} ${request.url} ${status} }`,)
        response.status(400).json(errorResponse);
    }

}