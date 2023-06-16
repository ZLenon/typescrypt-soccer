import { Model, QueryInterface, DataTypes } from 'sequelize';
import { Iusers } from '../../Interfaces/interfacesMigrations';

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<Iusers>>('users', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      }, 
      role: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      }, 
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      }     
    });
  },

  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('users');
  },
};
