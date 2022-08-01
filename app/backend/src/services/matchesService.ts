import Match from '../database/models/match';

class MatchService {
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

  postMatch = async (body: any) => {
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
}

export default MatchService;
