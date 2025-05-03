import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

export class Food extends Model {
  public food_id!: number;
  public name_food!: string;
  public main_image!: string;
  public ingredient_ids!: number;
  public description!: string;
}

Food.init(
  {
    food_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name_food: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    main_image: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    ingredient_ids: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'food',
    timestamps: false,
  }
);

export default Food;
