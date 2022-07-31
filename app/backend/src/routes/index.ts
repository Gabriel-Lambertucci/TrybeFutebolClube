import * as express from 'express';
import LoginController from '../controllers/loginController';
import loginMiddleware from '../middlewares/loginMiddleware';

const routes = express.Router();

const loginController = new LoginController();

routes.post('/login', loginMiddleware.validateLogin, loginController.authLogin);
routes.get('/login/validate', loginController.loginValidate);

export default routes;
