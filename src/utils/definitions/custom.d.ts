import User from '@/resources/user/user.interface';

declare global {
    namespace Express {
        ///Add User type to express request object
        export interface Request {
            user: User;
        }
    }
}
