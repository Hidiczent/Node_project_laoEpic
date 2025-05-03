// src/interface/nationalityModel.ts
import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class Nationality extends Model {
  public ID_Nationality!: number;
  public name!: string;
}

Nationality.init(
  {
    ID_Nationality: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'nationality',
    timestamps: false, // ปิดการใช้งาน timestamps หากไม่มีใน database
  }
);

export default Nationality;
