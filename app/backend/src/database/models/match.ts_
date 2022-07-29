import { DataTypes, Model } from 'sequelize';
import db from '.';
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
  awayTeamGols: DataTypes.INTEGER,
  inProgress: DataTypes.BOOLEAN,
}, {
  // ... Outras configs
  underscored: true,
  sequelize: db,
  modelName: 'Match',
  timestamps: false,
});

export default Match;
