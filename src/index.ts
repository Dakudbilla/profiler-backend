import 'dotenv/config';
import 'module-alias/register';
import validateEnv from '@/utils/validateEnv';
import App from './app';
import PostController from '@/resources/post/post.controller';

//check if all environment variables are correct
validateEnv();

//Initialise Application

const app = new App([new PostController()], Number(process.env['PORT']));

app.listen();
