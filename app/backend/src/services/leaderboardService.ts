import calculaPontos from '../utils/calculaPontos';

class LeaderboardService {
  getLeaderboard = async () => {
    const leaderboard = await calculaPontos();
    return leaderboard;
  };
}

export default LeaderboardService;
