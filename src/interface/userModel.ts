import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";

// Define the User model
export class User extends Model {
  public user_id!: number;
  public first_name!: string;
  public lastname!: string;
  public password!: string;
  public phone_number!: number;
  public email!: string;
  public is_verified!: boolean; // ✅ เพิ่มบรรทัดนี้
  public photo?: string;
  public role!: "user" | "admin";
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

User.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    first_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    phone_number: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    is_verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    photo: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    role: {
      type: DataTypes.ENUM("user", "admin"),
      allowNull: false,
      defaultValue: "user",
    },
  },
  {
    sequelize, // Pass the sequelize instance
    tableName: "users",
    timestamps: true, // Enable timestamps to automatically handle created_at and updated_at
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default User;
