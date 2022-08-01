import calcula from '../utils/calculaPontos';

class LeaderboardService {
  getLeaderboard = async () => {
    const leaderboard = await calcula.calculaPontos();
    return leaderboard;
  };

  getHomeLeaderboard = async () => {
    const leaderboard = await calcula.calculaPontosHome();
    return leaderboard;
  };

  getAwayLeaderboard = async () => {
    const leaderboard = await calcula.calculaPontosAway();
    return leaderboard;
  };
}

export default LeaderboardService;
