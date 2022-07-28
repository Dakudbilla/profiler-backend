import { Router, Request, Response } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import validationMiddleware from '@/middleware/validation.middleware';
import validate from '@/resources/post/post.validation';
import PostService from '@/resources/post/post.service';
import { NextFunction } from 'express-serve-static-core';

class PostController implements Controller {
    public path = '/posts';
    public router = Router();
    private PostService;

    constructor() {
        //configure all routes
        this.initialiseRoutes();
        //create new instance of Post service
        this.PostService = new PostService();
    }

    private initialiseRoutes(): void {
        this.router.post(
            `${this.path}`,
            validationMiddleware(validate.create),
            this.create
        );
    }

    //Create New Post
    private create = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { title, body } = req.body;

            const post = await this.PostService.create(title, body);

            res.status(201).json({ post });
        } catch (error: any) {
            //Call exception handler to handle error
            next(new HttpException(400, error.message));
        }
    };
}

export default PostController;
