import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

export class Village extends Model {
  public village_id!: number;
  public name!: string;
  public district_id!: number;
}

Village.init(
  {
    village_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    district_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'village',
    timestamps: false, // ปิดการใช้งาน timestamps
  }
);

export default Village;
