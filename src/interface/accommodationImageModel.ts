import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";

export class AccommodationImage extends Model {
  public image_id!: number;
  public accommodation_id!: number;
  public image_url!: string;
  public sub_images!: string[]; // Array of sub image URLs
}

AccommodationImage.init(
  {
    image_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    accommodation_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    image_url: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    sub_images: {
      type: DataTypes.TEXT, // เก็บข้อมูลเป็น JSON string
      allowNull: true,
      get() {
        const rawValue = this.getDataValue("sub_images");
        return rawValue ? JSON.parse(rawValue) : []; // แปลง JSON string กลับเป็น array
      },
      set(value: string[]) {
        this.setDataValue("sub_images", JSON.stringify(value)); // แปลง array เป็น JSON string ก่อนบันทึก
      },
    },
  },
  {
    sequelize,
    tableName: "accommodation_images",
    timestamps: false,
  }
);

export default AccommodationImage;
