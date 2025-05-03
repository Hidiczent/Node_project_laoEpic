// models/package.ts
import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class Package extends Model {}

Package.init(
  {
    package_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    main_image_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    about: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    price_in_usd: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    tour_info: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    activities: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    added_person_price_in_usd: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    guide_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    accommodation_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    transportation_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    available_type: {
      type: DataTypes.ENUM("DAYS", "MONTH"),
      allowNull: true,
    },
    available_date: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    available_day: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    food_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    type_package_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    village_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "village",
        key: "village_id",
      },
    },
    people_limit: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    bring: {
      type: DataTypes.JSON,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Package",
    tableName: "packages",
    timestamps: false,
    paranoid: true,
  }
);

export default Package;
