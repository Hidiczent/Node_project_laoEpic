import { DataTypes } from 'sequelize';
import sequelize from '../config/database';

const Order = sequelize.define('Order', {
  order_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  ID_Reformbook: {
    type: DataTypes.INTEGER,
  },
  package_id: {
    type: DataTypes.INTEGER,
  },
  order_date: {
    type: DataTypes.DATE,
  },
  order_status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cancellation_reason: {
    type: DataTypes.TEXT,
  },
  cancellation_date: {
    type: DataTypes.DATE,
  },
  id_payment: {
    type: DataTypes.INTEGER,
  },
}, {
  tableName: 'orders',
  timestamps: false,
});

export default Order;
