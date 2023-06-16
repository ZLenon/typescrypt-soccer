import { Model, QueryInterface, DataTypes } from 'sequelize';
import { Imatches } from '../../Interfaces/interfacesMigrations';

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<Imatches>>('matches', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
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
      }
    });
  },

  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('matches');
  },
};
