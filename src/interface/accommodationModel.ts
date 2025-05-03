// src/interface/accommodationModel.ts

import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

export class Accommodation extends Model {
  public accommodation_id!: number;
  public name!: string;
  public main_image!: string;
  public village_id!: number;
  public about!: string;
  public popular_facilities!: string;
  public latitude!: number;
  public longitude!: number;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

Accommodation.init(
  {
    accommodation_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    main_image: {
      type: DataTypes.STRING(255),
    },
    village_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    about: {
      type: DataTypes.TEXT,
    },
    popular_facilities: {
      type: DataTypes.STRING(255),
    },
    latitude: {
      type: DataTypes.DECIMAL(10, 7),
    },
    longitude: {
      type: DataTypes.DECIMAL(10, 7),
    },
  },
  {
    sequelize, // pass the sequelize instance
    tableName: 'accommodation',
    timestamps: false, // ปิดการใช้งาน timestamps
  }
);

export default Accommodation;
