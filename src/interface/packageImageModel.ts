import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class PackageImage extends Model {}

PackageImage.init(
  {
    image_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    package_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "packages",
        key: "package_id",
      },
    },
    image_url: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "PackageImage",
    tableName: "package_images",
    timestamps: false,
    paranoid: true,
  }
);

export default PackageImage;
