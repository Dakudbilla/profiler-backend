import { Request, Response, NextFunction, RequestHandler } from 'express';
import Joi from 'joi';

//This function takes a schema and validates it with joi
export default function validationMiddleware(
    schema: Joi.Schema
): RequestHandler {
    return async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        const validationOptions = {
            /**
             * abortEarly: stop validating other values when one fails
             * setting it to false returns all errors
             *
             * allowUnknown: allows values that are not defined in schema to not cause errow
             *
             * stripUnknown: Get rid of unknown values passed in
             */
            abortEarly: false,
            allowUnknown: true,
            stripUnknown: true,
        };

        try {
            const value = await schema.validateAsync(
                req.body,
                validationOptions
            );
            req.body = value;
            next();
        } catch (e: any) {
            //Put all validation errors into an array and send it to user
            const errors: string[] = [];

            e.details.forEach((err: Joi.ValidationErrorItem) => {
                errors.push(err.message);
            });

            res.status(400).send({ errors });
        }
    };
}
