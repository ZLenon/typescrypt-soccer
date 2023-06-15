import { Model, QueryInterface, DataTypes } from 'sequelize';
import { Iteams } from '../../Interfaces/interfacesMigrations';

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<Iteams>>('teams', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      teamName: {
        type: DataTypes.STRING,
        field: 'team_name',
        allowNull: false,
      }    
    });
  },

  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('teams');
  },
};