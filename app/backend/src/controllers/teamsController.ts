import { Request, Response } from 'express';
import TeamsService from '../services/teamsService';

class TeamsController {
  teamsService: TeamsService;

  constructor() {
    this.teamsService = new TeamsService();
  }

  getTeams = async (__req: Request, res: Response): Promise<Response | undefined> => {
    const teams = await this.teamsService.getTeams();

    return res.status(200).json(teams);
  };

  getTeamById = async (req: Request, res: Response): Promise<Response | undefined> => {
    const team = await this.teamsService.getTeamById(parseInt(req.params.id, 10));

    return res.status(200).json(team);
  };
}

export default TeamsController;
