import { Router } from 'express';
import multer from 'multer';
import authMiddleware from './app/middlewares/auth';
import multerConfig from './config/multer';

import FileController from './app/controllers/FileController';
import MeetupController from './app/controllers/MeetupController';
import SessionController from './app/controllers/SessionController';
import SubscriptionController from './app/controllers/SubscriptionController';
import OrganizingController from './app/controllers/OrganizingController';
import UserController from './app/controllers/UserController';

const upload = multer(multerConfig);

const routes = new Router();

routes.post('/sessions', SessionController.store);
routes.post('/users', UserController.store);

routes.use(authMiddleware);

routes.get('/meetups', MeetupController.index);
routes.post('/meetups', MeetupController.store);
routes.put('/meetups/:id', MeetupController.update);
routes.delete('/meetups/:id', MeetupController.delete);
routes.post('/meetups/:id/subscription', SubscriptionController.store);

routes.get('/organizing', OrganizingController.index);

routes.post('/uploads', upload.single('file'), FileController.store);

routes.put('/users', UserController.update);

export default routes;
