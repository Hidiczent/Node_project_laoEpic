import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

export class District extends Model {
  public district_id!: number;
  public name!: string;
  public province_id!: number;
}

District.init(
  {
    district_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    province_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'district',
    timestamps: false, // ปิดการใช้งาน timestamps
  }
);

export default District;
