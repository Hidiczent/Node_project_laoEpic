import { DataTypes } from "sequelize";
import sequelize from "../config/database";

const RegisterFormBook = sequelize.define(
  "RegisterFormBook",
  {
    ID_Reformbook: {
      type: DataTypes.INTEGER,
      primaryKey: true, // กำหนดเป็น primary key
      autoIncrement: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Birth: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    ID_Nationality: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Date_for_book: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    Number_of_participants: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Number_of_pass_port: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Note: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    ID_User: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    package_id: { // เพิ่มฟิลด์ package_id
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "register_form_to_book", // ชื่อ table ในฐานข้อมูล
    timestamps: false, // หากไม่มีฟิลด์ createdAt และ updatedAt
  }
);

export default RegisterFormBook;
