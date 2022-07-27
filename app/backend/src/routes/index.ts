import * as express from 'express';
import LoginController from '../controllers/loginController';
import loginMiddleware from '../middlewares/loginMiddleware';

const routes = express.Router();

const loginController = new LoginController();

routes.get('/login', loginMiddleware.validateLogin, loginController.authLogin);

export default routes;
