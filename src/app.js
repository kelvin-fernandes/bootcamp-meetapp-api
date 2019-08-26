import 'dotenv/config';
import express from 'express';
import { resolve } from 'path';
import morgan from 'morgan';
import routes from './routes';
import './database';

class App {
    constructor() {
        this.server = express();

        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.server.use(express.json());
        this.server.use(morgan('dev'));
        this.server.use(
            '/uploads',
            express.static(resolve(__dirname, '..', 'tmp', 'uploads'))
        );
    }

    routes() {
        this.server.use(routes);
    }
}

export default new App().server;
