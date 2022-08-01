import { Router, Request, Response } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import validationMiddleware from '@/middleware/validation.middleware';
import validate from '@/resources/user/user.validation';
import UserService from '@/resources/user/user.service';
import authenticated from '@/middleware/authenticated.middleware';
import { NextFunction } from 'express-serve-static-core';

class UserController implements Controller {
    public path: string;
    public router = Router();
    public UserService: UserService;

    constructor() {
        this.path = '/users';
        this.UserService = new UserService();
        this.initialiseRouter();
    }

    private initialiseRouter(): void {
        this.router.post(
            `${this.path}/register`,
            validationMiddleware(validate.register),
            this.register
        );

        this.router.post(
            `${this.path}/login`,
            validationMiddleware(validate.login),
            this.login
        );

        this.router.get(`${this.path}`, authenticated, this.getUser);
    }

    private register = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { name, email, password } = req.body;

            //Hardcode the role of the person registering, since we do not yet have it being passed at frontend
            const token = await this.UserService.register(
                name,
                email,
                password,
                'user'
            );

            return res.status(201).json({ token });
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    //Login methond
    private login = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { email, password } = req.body;

            //Get token
            const token = await this.UserService.login(email, password);

            res.status(200).json({ token });
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    private getUser = (
        req: Request,
        res: Response,
        next: NextFunction
    ): Response | void => {
        if (!req.user) {
            return next(new HttpException(404, 'User not logged in'));
        }
        return res.status(200).json({
            user: req.user,
        });
    };
}

export default UserController;
