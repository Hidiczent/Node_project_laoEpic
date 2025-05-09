// models/Order.ts
import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/database';

interface OrderAttributes {
  order_id: number;
  ID_Reformbook: number;
  package_id: number;
  order_date: Date;
  order_status: string;
  cancellation_reason?: string;
  cancellation_date?: Date;
  id_payment?: number;
}

interface OrderCreationAttributes extends Optional<OrderAttributes, 'order_id'> {}

class Order extends Model<OrderAttributes, OrderCreationAttributes> implements OrderAttributes {
  public order_id!: number;
  public ID_Reformbook!: number;
  public package_id!: number;
  public order_date!: Date;
  public order_status!: string;
  public cancellation_reason?: string;
  public cancellation_date?: Date;
  public id_payment?: number;
}

Order.init(
  {
    order_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    ID_Reformbook: { type: DataTypes.INTEGER },
    package_id: { type: DataTypes.INTEGER },
    order_date: { type: DataTypes.DATE },
    order_status: { type: DataTypes.STRING, allowNull: false },
    cancellation_reason: { type: DataTypes.TEXT },
    cancellation_date: { type: DataTypes.DATE },
    id_payment: { type: DataTypes.INTEGER },
  },
  {
    sequelize,
    tableName: 'orders',
    timestamps: false,
  }
);

export default Order;
