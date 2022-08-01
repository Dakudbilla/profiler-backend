import 'dotenv/config';
import 'module-alias/register';
import validateEnv from '@/utils/validateEnv';
import App from './app';
import UserController from '@/resources/user/user.controller';
import ProfileService from '@/resources/profile/profile.controller';

//check if all environment variables are correct
validateEnv();

//Initialise Application

const app = new App(
    [new ProfileService(), new UserController()],
    Number(process.env['PORT'])
);

app.listen();
