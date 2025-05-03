import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

export class Province extends Model {
  public province_id!: number;
  public name!: string;
}

Province.init(
  {
    province_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'province',
    timestamps: false, // ปิดการใช้งาน timestamps
  }
);

export default Province;
