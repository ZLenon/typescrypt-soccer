import { DataTypes, Model, InferCreationAttributes, InferAttributes,
} from 'sequelize';
import db from '.';

class UsersModel extends Model<InferAttributes<UsersModel>,
InferCreationAttributes<UsersModel>> {
  id!: number;
  username!: string;
  role!: string;
  email!: string;
  password!: string;
}

UsersModel.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
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
  },
}, {
  sequelize: db,
  underscored: true,
  timestamps: false,
  tableName: 'users',
  modelName: 'UserModel',
});

export default UsersModel;
