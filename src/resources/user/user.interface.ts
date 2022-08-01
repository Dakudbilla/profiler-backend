import { Document } from 'mongoose';

export default interface User extends Document {
    email: string;
    name: string;
    password: string;
    role: string;
    age: number;

    isValidPassword(password: string): Promise<Error | boolean>;
}
