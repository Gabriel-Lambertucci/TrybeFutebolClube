import MatchService from '../services/matchesService';
import TeamsService from '../services/teamsService';

const totalHome = (matches: Array<any>, teamName: string): Array<number> => {
  let points = 0; let games = 0; let victories = 0; let draws = 0;
  let losses = 0; let goalsFavor = 0; let goalsOwn = 0;
  matches.forEach((item: any) => {
    if (item.teamHome.teamName === teamName) {
      games += 1;
      goalsFavor += item.homeTeamGoals; goalsOwn += item.awayTeamGoals;
      if (item.homeTeamGoals > item.awayTeamGoals) {
        points += 3;
        victories += 1;
      } else if (item.homeTeamGoals === item.awayTeamGoals) {
        points += 1;
        draws += 1;
      } else if (item.homeTeamGoals < item.awayTeamGoals) {
        losses += 1;
      }
    }
  });
  return [points, games, victories, draws, losses, goalsFavor, goalsOwn];
};

const totalAway = (matches: Array<any>, teamName: string): Array<number> => {
  let points = 0; let games = 0; let victories = 0; let draws = 0;
  let losses = 0; let goalsFavor = 0; let goalsOwn = 0;
  matches.forEach((item: any) => {
    if (item.teamAway.teamName === teamName) {
      games += 1;
      goalsFavor += item.awayTeamGoals; goalsOwn += item.homeTeamGoals;
      if (item.homeTeamGoals < item.awayTeamGoals) {
        points += 3;
        victories += 1;
      } else if (item.homeTeamGoals === item.awayTeamGoals) {
        points += 1;
        draws += 1;
      } else if (item.homeTeamGoals > item.awayTeamGoals) {
        losses += 1;
      }
    }
  });
  return [points, games, victories, draws, losses, goalsFavor, goalsOwn];
};

const sortArray = (array: Array<any>) => {
  const leaderboard = array.sort((a, b) => b.totalPoints - a.totalPoints
  || b.totalVictories - a.totalVictories
  || b.goalsBalance - a.goalsBalance || b.goalsFavor - a.goalsFavor || a.goalsOwn - b.goalsOwn);
  return leaderboard;
};

const calculaEfficiency = (matches: Array<any>, teamName: string): number => {
  const efficiency = (100 * ((totalHome(matches, teamName)[0] + totalAway(matches, teamName)[0])
    / ((totalHome(matches, teamName)[1] + totalAway(matches, teamName)[1]) * 3))).toFixed(2);
  return parseFloat(efficiency);
};

const calculaPontos = async () => {
  const matchesService = new MatchService();
  const matches = await matchesService.getMatchesFinished();

  const teamsService = new TeamsService();
  const teams = await teamsService.getTeams();

  const table = teams.map((item) => ({
    name: item.teamName,
    totalPoints: totalHome(matches, item.teamName)[0] + totalAway(matches, item.teamName)[0],
    totalGames: totalHome(matches, item.teamName)[1] + totalAway(matches, item.teamName)[1],
    totalVictories: totalHome(matches, item.teamName)[2] + totalAway(matches, item.teamName)[2],
    totalDraws: totalHome(matches, item.teamName)[3] + totalAway(matches, item.teamName)[3],
    totalLosses: totalHome(matches, item.teamName)[4] + totalAway(matches, item.teamName)[4],
    goalsFavor: totalHome(matches, item.teamName)[5] + totalAway(matches, item.teamName)[5],
    goalsOwn: totalHome(matches, item.teamName)[6] + totalAway(matches, item.teamName)[6],
    goalsBalance: totalHome(matches, item.teamName)[5] + totalAway(matches, item.teamName)[5]
    - totalHome(matches, item.teamName)[6] - totalAway(matches, item.teamName)[6],
    efficiency: calculaEfficiency(matches, item.teamName),
  })); return sortArray(table);
};

export default calculaPontos;
