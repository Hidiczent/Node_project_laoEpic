import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";

class OTPMetadata extends Model {
  public id!: number;
  public email!: string;
  public action!: string;
  public field_key!: string;
  public field_value!: string;
  public readonly created_at!: Date;
}

OTPMetadata.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    action: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    field_key: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    field_value: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "otp_metadata",
    timestamps: false, // ❌ ไม่มี updated_at หรือ createdAt แบบ Sequelize
  }
);

export default OTPMetadata;
