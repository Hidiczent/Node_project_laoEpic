import { DataTypes } from 'sequelize';
import sequelize from '../config/database';

const Payment = sequelize.define('Payment', {
  id_payment: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  payment_amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  payment_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  payment_method: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  payment_status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  exchange_rate_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  }
}, {
  tableName: 'payment',
  timestamps: false, // ปิดการใช้งาน createdAt และ updatedAt
});

export default Payment;
