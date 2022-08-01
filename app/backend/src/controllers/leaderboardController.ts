import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboardService';

class LeaderboardController {
  leaderboardService: LeaderboardService;

  constructor() {
    this.leaderboardService = new LeaderboardService();
  }

  getLeaderboard = async (__req: Request, res: Response): Promise<Response | undefined> => {
    const leaderboard = await this.leaderboardService.getLeaderboard();

    return res.status(200).json(leaderboard);
  };

  getHomeLeaderboard = async (__req: Request, res: Response): Promise<Response | undefined> => {
    const leaderboard = await this.leaderboardService.getHomeLeaderboard();

    return res.status(200).json(leaderboard);
  };

  getAwayLeaderboard = async (__req: Request, res: Response): Promise<Response | undefined> => {
    const leaderboard = await this.leaderboardService.getAwayLeaderboard();

    return res.status(200).json(leaderboard);
  };
}

export default LeaderboardController;
