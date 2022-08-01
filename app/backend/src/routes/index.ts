import * as express from 'express';
import LeaderboardController from '../controllers/leaderboardController';
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
routes.patch('/matches/:id/finish', matchesController.patchMatch);
routes.patch('/matches/:id', matchesController.patchMatchById);

// Leaderboard

const leaderboard = new LeaderboardController();

routes.get('/leaderboard', leaderboard.getLeaderboard);
routes.get('/leaderboard/home', leaderboard.getHomeLeaderboard);
routes.get('/leaderboard/away', leaderboard.getAwayLeaderboard);

export default routes;
