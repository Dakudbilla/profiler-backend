import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import validationMiddleware from '@/middleware/validation.middleware';
import validate from '@/resources/profile/profile.validation';
import PostService from '@/resources/profile/profile.service';

class PostController implements Controller {
    public path = '/posts';
    public router = Router();
    private PostService;

    constructor() {
        //configure all routes associated with Posts
        this.initialiseRoutes();
        //create new instance of Post service
        this.PostService = new PostService();
    }

    //Defines and adds all routes associated to Posts to express router
    private initialiseRoutes(): void {
        //Add new Post route
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
