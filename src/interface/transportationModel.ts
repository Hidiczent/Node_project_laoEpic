import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";

class Transportation extends Model {
  public transportation_id!: number;
  public name!: string;
  public main_image!: string;
  public about!: string;
  public type_transportation_ids!: number;
  public description!: string;
}

Transportation.init(
  {
    transportation_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    main_image: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    about: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    type_transportation_ids: {
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
    modelName: "Transportation",
    tableName: "transportation",
    timestamps: false,
  }
);

export default Transportation;
