import { Request, Response, NextFunction } from 'express';
import HttpException from '@/utils/exceptions/http.exception';

/**
 * @Description This middleware catches all errors thrown in the application
 * @param error Error thrown
 * @param _req Request Object
 * @param res  Response Object
 * @param _next Next function
 */
function ErrorMiddleware(
    error: HttpException,
    _req: Request,
    res: Response,
    _next: NextFunction
): void {
    const status = error.status || 500;
    const message = error.message || 'Server Error';

    res.status(status).send({
        status,
        message,
    });
}

export default ErrorMiddleware;
