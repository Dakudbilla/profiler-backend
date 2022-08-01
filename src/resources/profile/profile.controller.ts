import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import validationMiddleware from '@/middleware/validation.middleware';
import validate from '@/resources/profile/profile.validation';
import ProfileService from '@/resources/profile/profile.service';
import authenticated from '@/middleware/authenticated.middleware';
import mongoose from 'mongoose';

class ProfileController implements Controller {
    public path = '/profile';
    public router = Router();
    private ProfileService;

    constructor() {
        //configure all routes associated with Profiles
        this.initialiseRoutes();
        //create new instance of Profile service
        this.ProfileService = new ProfileService();
    }

    //Defines and adds all routes associated to profiles to express router
    private initialiseRoutes(): void {
        //Add new profile route
        this.router.post(
            `${this.path}`,
            authenticated,
            validationMiddleware(validate.create),
            this.create
        );

        //update profile route
        this.router.patch(
            `${this.path}/:id`,
            authenticated,
            validationMiddleware(validate.create),
            this.update
        );

        //Get all profiles
        this.router.get(`${this.path}`, this.getProfiles);

        //Get single route
        this.router.get(`${this.path}/:id`, this.getSingleProfile);

        //Delete route
        this.router.delete(
            `${this.path}/:id`,
            authenticated,
            this.deleteProfile
        );
    }

    /**
     * @route        POST /profile
     * @description   create  profile of current user using token
     * @acess          Private
     */
    private create = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            // const profileFields = {} as Profile;

            // profileFields['skills'] = [...skills] as Skill[];
            // profileFields.name = name;
            // profileFields.age = age;
            // console.log(profileFields);
            // profileFields.employment_status = employment_status;
            // profileFields.bio = bio;
            // profileFields.profile_image = profile_image;
            // profileFields.experience = [...experience] as Experience[];
            // profileFields.education = [...education] as Education[];
            // profileFields.certification = [...certification] as Certification[];
            // profileFields.social_links = {
            //     facebook,
            //     twitter,
            //     linkedin,
            //     instagram,
            //     youtube,
            // };
            req.body = { ...req.body, user: req.user };
            const profile = await this.ProfileService.create(req.body);
            if (profile) {
                return res.status(201).json({
                    profile,
                });
            }
        } catch (error: any) {
            //Call exception handler to handle error
            next(new HttpException(400, error.message));
        }
    };

    /**
     * @route        PATCH /profile/:id
     * @description   update profile of current user using token
     * @acess          Private
     */
    private update = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            next(new HttpException(400, 'Profile not Found'));
        }
        try {
            const profile = await this.ProfileService.update(
                req.body,
                req.params.id
            );

            res.status(200).json({ profile });
        } catch (error: any) {
            //Call exception handler to handle error
            next(new HttpException(400, error.message));
        }
    };

    //Get all profiles
    private getProfiles = async (
        _req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const profiles = await this.ProfileService.getAll();

            res.status(200).json({ profiles });
        } catch (error: any) {
            //Call exception handler to handle error
            next(new HttpException(400, error.message));
        }
    };

    /**
     * @route         GET /profile/id
     * @description   Get a user's profile by user_id
     * @acess          Public
     */
    private getSingleProfile = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
                next(new HttpException(400, 'Profile not Found'));
            }

            const profile = await this.ProfileService.getSingle(req.params.id);

            res.status(200).json({ profile });
        } catch (error: any) {
            //Call exception handler to handle error
            next(new HttpException(400, error.message));
        }
    };

    /**
     * @route         DELETE /profile/id
     * @description   DELETE profile, user and posts[Delete Account and its details]
     * @acess          Public
     */
    private deleteProfile = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            next(new HttpException(400, 'Profile not Found'));
        }
        try {
            const deleteMessage = await this.ProfileService.delete(
                req.params.id
            );

            res.status(200).json({ deleteMessage });
        } catch (error: any) {
            //Call exception handler to handle error
            next(new HttpException(400, error.message));
        }
    };
}

export default ProfileController;
