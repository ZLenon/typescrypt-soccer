import { DataTypes, Model, InferCreationAttributes, InferAttributes,
} from 'sequelize';
import db from '.';
import TeamModel from './TeamsModel';

class MatchModel extends Model<InferAttributes<MatchModel>,
InferCreationAttributes<MatchModel>> {
  id!: number;
  homeTeamId!: number;
  homeTeamGoals!: number;
  awayTeamId!: number;
  awayTeamGoals!: number;
  inProgress!: boolean;
}

MatchModel.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  homeTeamId: {
    type: DataTypes.INTEGER,
    field: 'home_team_id',
    allowNull: false,
    references: {
      model: 'teams',
      key: 'id',
    },
  },
  homeTeamGoals: {
    type: DataTypes.INTEGER,
    field: 'home_team_goals',
    allowNull: false,
  },
  awayTeamId: {
    type: DataTypes.INTEGER,
    field: 'away_team_id',
    allowNull: false,
    references: {
      model: 'teams',
      key: 'id',
    },
  },
  awayTeamGoals: {
    type: DataTypes.INTEGER,
    field: 'away_team_goals',
    allowNull: false,
  },
  inProgress: {
    type: DataTypes.BOOLEAN,
    field: 'in_progress',
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
});

TeamModel.hasMany(MatchModel, {
  foreignKey: 'homeTeamId',
  as: 'partidasDaCasa', // repensar depois
});

MatchModel.belongsTo(TeamModel, {
  foreignKey: 'homeTeamId',
  as: 'homeTeam',
});
MatchModel.belongsTo(TeamModel, {
  foreignKey: 'awayTeamId',
  as: 'awayTeam',
});

export default MatchModel;
