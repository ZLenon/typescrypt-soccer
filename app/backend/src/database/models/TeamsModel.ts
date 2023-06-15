import { DataTypes, Model, InferCreationAttributes, InferAttributes,
} from 'sequelize';
import db from '.';

class TeamsModel extends Model<InferAttributes<TeamsModel>,
InferCreationAttributes<TeamsModel>> {
  id!: number;

  teamName!: string;
}

TeamsModel.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  teamName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize: db,
  tableName: 'teams', // Nome da tabela
  timestamps: false, // "createdAt" e "updatedAt"
  underscored: true, // permite separação por underline
});

export default TeamsModel;
