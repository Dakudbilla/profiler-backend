import UserModel from '@/resources/user/user.model';
import { verifyToken } from '@/utils/token';
import { Request, Response, NextFunction } from 'express';
import Token from '@/utils/interfaces/token.interface';
import HttpException from '@/utils/exceptions/http.exception';
import jwt from 'jsonwebtoken';

async function authenticatedMiddleware(
    req: Request,
    _res: Response,
    next: NextFunction
): Promise<Response | void> {
    const bearer = req.headers.authorization;

    if (!bearer || !bearer.startsWith('Bearer ')) {
        return next(new HttpException(401, ' Unauthorised Access'));
    }

    //remove token from bearer
    const accessToken = bearer.split('Bearer: ')[1].trim();

    try {
        //Verify token
        const payload: Token | jwt.JsonWebTokenError = await verifyToken(
            accessToken
        );
        if (payload instanceof jwt.JsonWebTokenError) {
            return next(new HttpException(401, ' Unauthorised Access'));
        }

        //Get user from database
        const user = await UserModel.findById(payload.id)
            .select('-password')
            .exec();

        //Handle user not existent case
        if (!user) {
            return next(new HttpException(401, ' Unauthorised Access'));
        }

        /**
         * Set user on request (To prevent typescript screaming for user,
         *   we add user interface to express response interface via global type interface
         *  see @definitions folder under @utils folder)
         */
        req.user = user;
        return next();
    } catch (err) {
        return next(new HttpException(401, ' Unauthorised Access'));
    }
}

export default authenticatedMiddleware;
