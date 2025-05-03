import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";

class TypeTransportation extends Model {
  public type_transportation_id!: number;
  public name!: string;
  public main_image!: string;
}

TypeTransportation.init(
  {
    type_transportation_id: {
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
  },
  {
    sequelize,
    modelName: "TypeTransportation",
    tableName: "type_transportation",
    timestamps: false,
  }
);

export default TypeTransportation;
