import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class FoodImage extends Model {
  public image_id!: number;
  public food_id!: number;
  public sub_images!: string[];
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

FoodImage.init(
  {
    image_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    food_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sub_images: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'food_images',
    timestamps: true, // เปิดใช้งาน timestamps สำหรับ created_at และ updated_at
    createdAt: 'created_at', // แมปไปยังฟิลด์ created_at ใน DB
    updatedAt: 'updated_at', // แมปไปยังฟิลด์ updated_at ใน DB
  }
);

export default FoodImage;
