import { ConnectionOptions } from 'typeorm';
import dotenv from 'dotenv';

dotenv.config(); // โหลดค่าในไฟล์ .env

const config: ConnectionOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
entities: ['src/config/entity/*.ts'],
  synchronize: true,
};

export default config;
