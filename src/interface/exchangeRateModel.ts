import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

export class ExchangeRate extends Model {
  public exchange_rate_id!: number;
  public source_currency!: string;
  public dest_currency!: string;
  public last_update!: Date;
  public amount!: number;
  public readonly created_at!: Date;
  public readonly deleted_at!: Date;
}

ExchangeRate.init(
  {
    exchange_rate_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    source_currency: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    dest_currency: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    last_update: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 4),
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    deleted_at: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    tableName: 'exchange_rate',
    timestamps: true, // Automatically adds createdAt and updatedAt fields
    paranoid: true,   // Adds deletedAt field for soft delete
    createdAt: 'created_at',
    updatedAt: 'last_update',
    deletedAt: 'deleted_at',
  }
);

export default ExchangeRate;
