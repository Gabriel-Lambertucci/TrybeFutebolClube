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
}

export default MatchService;
