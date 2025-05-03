import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class Guide extends Model {}

Guide.init(
  {
    guide_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    card_ID: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    photo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    birth_day: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    village_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'village',
        key: 'village_id',
      },
      allowNull: false,
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isEmail: true,
      },
    },
    background: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Guide',
    tableName: 'guide_name',
    timestamps: false,
  }
);

export default Guide;
