import * as express from 'express';
import TeamsController from '../controllers/teamsController';
import LoginController from '../controllers/loginController';
import loginMiddleware from '../middlewares/loginMiddleware';
import MatchesController from '../controllers/matchesController';

const routes = express.Router();

// Login

const loginController = new LoginController();

routes.post('/login', loginMiddleware.validateLogin, loginController.authLogin);
routes.get('/login/validate', loginController.loginValidate);

// Teams

const teamsController = new TeamsController();

routes.get('/teams', teamsController.getTeams);
routes.get('/teams/:id', teamsController.getTeamById);

// Matches

const matchesController = new MatchesController();

routes.get('/matches', matchesController.getMatches);
routes.post('/matches', matchesController.postMatch);

export default routes;
