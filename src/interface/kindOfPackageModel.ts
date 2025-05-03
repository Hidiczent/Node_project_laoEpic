import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class KindOfPackage extends Model {
  public type_package_id!: number;
  public name!: string;
  public main_image!: string;
}

KindOfPackage.init(
  {
    type_package_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    main_image: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'kind_of_package',
    timestamps: false, // ปิดการใช้งาน timestamps หากคุณไม่ต้องการ createdAt, updatedAt
  }
);

export default KindOfPackage;
