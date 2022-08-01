import validateToken from '../utils/validateToken';
import Match from '../database/models/match';
import TeamsService from './teamsService';

class MatchService {
  teamsService: TeamsService;

  constructor() {
    this.teamsService = new TeamsService();
  }

  getMatches = async () => {
    const matches = await Match.findAll({
      include: [
        {
          association: 'teamHome',
          attributes: ['teamName'],
        },
        {
          association: 'teamAway',
          attributes: ['teamName'],
        },
      ],
    });

    return matches;
  };

  getMatchesInProgress = async () => {
    const matches = await Match.findAll({
      include: [
        {
          association: 'teamHome',
          attributes: ['teamName'],
        },
        {
          association: 'teamAway',
          attributes: ['teamName'],
        },
      ],
      where: { inProgress: true },
    });

    return matches;
  };

  getMatchesFinished = async () => {
    const matches = await Match.findAll({
      include: [
        {
          association: 'teamHome',
          attributes: ['teamName'],
        },
        {
          association: 'teamAway',
          attributes: ['teamName'],
        },
      ],
      where: { inProgress: false },
    });

    return matches;
  };

  postMatch = async (body: any, token: string) => {
    let response; const tokenIsValid = validateToken(token);

    if (!tokenIsValid) {
      response = { status: 401, message: 'Token must be a valid token' }; return response as any;
    } const teams = await this.teamsService.getTeams();

    const isValid = teams.find((item) => item.id === body.homeTeam)
    && teams.find((item) => item.id === body.awayTeam);

    if (!isValid) {
      response = { status: 404, message: 'There is no team with such id!' }; return response as any;
    }

    const match = await Match.create({
      homeTeam: body.homeTeam,
      homeTeamGoals: body.homeTeamGoals,
      awayTeam: body.awayTeam,
      awayTeamGoals: body.awayTeamGoals,
      inProgress: true,
    });

    return match;
  };

  patchMatch = async (id: number) => {
    const match = await Match.update({ inProgress: false }, {
      where: {
        id,
      },
    });
    return match;
  };

  patchMatchById = async (id: number, homeTeamGoals: number, awayTeamGoals: number) => {
    const match = await Match.update({ homeTeamGoals, awayTeamGoals }, {
      where: {
        id,
      },
    });
    return match;
  };
}

export default MatchService;
