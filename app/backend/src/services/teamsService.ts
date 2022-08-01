import Team from '../database/models/team';

class TeamsService {
  getTeams = async () => {
    const teams = await Team.findAll();

    return teams;
  };

  getTeamById = async (id: number) => {
    const team = await Team.findOne({
      where: { id },
    });

    return team;
  };
}

export default TeamsService;
