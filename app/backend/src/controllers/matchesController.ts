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
    const match = await this.matchesService.postMatch(req.body);

    return res.status(201).json(match);
  };

  patchMatch = async (req: Request, res: Response): Promise<Response | undefined> => {
    const match = await this.matchesService.patchMatch(parseInt(req.params.id, 10));

    if (match) return res.status(200).json({ message: 'Finished' });
  };
}

export default MatchesController;
