import { DataTypes, Model } from 'sequelize';
import db from '.';
import Team from './team';
// import OtherModel from './OtherModel';

class Match extends Model {
  id!: number;
  homeTeam!: string;
  homeTeamGoals!: number;
  awayTeam!: string;
  awayTeamGols!: number;
  inProgress!: boolean;
}

Match.init({
  // ... Campos
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  homeTeam: DataTypes.STRING,
  homeTeamGoals: DataTypes.INTEGER,
  awayTeam: DataTypes.STRING,
  awayTeamGoals: DataTypes.INTEGER,
  inProgress: DataTypes.BOOLEAN,
}, {
  // ... Outras configs
  underscored: true,
  sequelize: db,
  modelName: 'Match',
  timestamps: false,
});

Match.belongsTo(Team, { foreignKey: 'homeTeam', as: 'teamHome' });
Match.belongsTo(Team, { foreignKey: 'awayTeam', as: 'teamAway' });
Team.hasMany(Match, { foreignKey: 'id', as: 'matchesFromteam' });

export default Match;
