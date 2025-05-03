// src/interface/ingredientModel.ts

import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class Ingredient extends Model {
  public ingredient_id!: number;
  public element_of_ingredient!: string;
}

Ingredient.init(
  {
    ingredient_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    element_of_ingredient: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'ingredient',
    timestamps: false, // Disable timestamps if not needed
  }
);

export default Ingredient;
