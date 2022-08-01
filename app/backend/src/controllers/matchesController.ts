import { Request, Response } from 'express';
import MatchesService from '../services/matchesService';

class MatchesController {
  matchesService: MatchesService;

  constructor() {
    this.matchesService = new MatchesService();
  }

  getMatches = async (req: Request, res: Response): Promise<Response | undefined> => {
    if (req.query.inProgress === 'true') {
      const matches = await this.matchesService.getMatchesInProgress();
      return res.status(200).json(matches);
    }

    if (req.query.inProgress === 'false') {
      const matches = await this.matchesService.getMatchesFinished();
      return res.status(200).json(matches);
    }

    const matches = await this.matchesService.getMatches();
    return res.status(200).json(matches);
  };

  postMatch = async (req: Request, res: Response): Promise<Response | undefined> => {
    if (req.body.homeTeam === req.body.awayTeam) {
      return res.status(401).json(
        { message: 'It is not possible to create a match with two equal teams' },
      );
    }

    const token = req.headers.authorization;

    if (!token || typeof token !== 'string') {
      return res.status(401).json({ message: 'invalid token' });
    }

    const match = token && await this.matchesService.postMatch(req.body, token);

    console.log(match.dataValues, match.message);

    if (match) {
      return res.status(match.status || 201).json(match.dataValues || { message: match.message });
    }
  };

  patchMatch = async (req: Request, res: Response): Promise<Response | undefined> => {
    const match = await this.matchesService.patchMatch(parseInt(req.params.id, 10));

    if (match) return res.status(200).json({ message: 'Finished' });
  };
}

export default MatchesController;
