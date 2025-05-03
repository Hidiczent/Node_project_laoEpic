import { DataTypes } from "sequelize";
import sequelize from "../config/database";

const Notification = sequelize.define("Notification", {
  notification_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  status_notification: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  order_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: "notification",
  timestamps: false,
});

export default Notification;
