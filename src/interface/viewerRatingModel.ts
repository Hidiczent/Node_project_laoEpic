import { DataTypes } from "sequelize";
import sequelize from "../config/database";

const ViewerRating = sequelize.define("ViewerRating", {
  ID_review: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  ID_user: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  comment: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  create_at: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  package_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: "the_viewer_rating",
  timestamps: false,
});

export default ViewerRating;
