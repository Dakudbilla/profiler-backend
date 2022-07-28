import compression from 'compression';
import express, { Application } from 'express';
import mongoose, { Error } from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import Controller from '@/utils/interfaces/controller.interface';
import ErrorMiddleware from '@/middleware/error.middleware';
import HttpException from './utils/exceptions/http.exception';

class App {
    public express: Application;
    public port: number;

    /**
     * Initalise application
     */
    constructor(controllers: Controller[], port: number) {
        this.express = express();
        this.port = port;
        this.initialiseDatabaseConnection();
        this.initialiseMiddleware();
        this.initialiseControllers(controllers);
        this.initialiseErrorHandling();
    }

    /**
     * Initalise application with all middlewarees available
     */
    private initialiseMiddleware(): void {
        this.express.use(helmet());
        this.express.use(cors());
        this.express.use(morgan('dev'));
        this.express.use(express.json());
        this.express.use(express.urlencoded({ extended: false }));
        this.express.use(compression());
    }

    /**
     * Add all controllers to application
     */
    private initialiseControllers(controllers: Controller[]): void {
        controllers.forEach((controller: Controller) => {
            this.express.use('/api/v1/', controller.router);
        });
    }

    /**
     * Initalise application with all Error middlewares available
     */
    private initialiseErrorHandling(): void {
        this.express.use(ErrorMiddleware);
    }

    /**
     * Handle Application connection to database
     */
    private async initialiseDatabaseConnection() {
        const { MONGO_URI } = process.env;

        try {
            await mongoose.connect(`${MONGO_URI}`);
            console.log(`Database Connection Succesful`);
        } catch (error: any) {
            console.log('Database Connection failed', error.message);
            throw new HttpException(500, error.message);
        }
    }

    /**
     * Listen for requests to app
     */
    public listen(): void {
        this.express.listen(this.port, () => {
            console.log(`App running on port ${this.port}`);
        });
    }
}

export default App;
