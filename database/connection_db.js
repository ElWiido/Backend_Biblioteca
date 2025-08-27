import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.USER,
  process.env.PASSWORD,
  {
    host: process.env.DB_SERVER,
    dialect: process.env.DB_DIALECT,
    port: parseInt(process.env.DB_PORT), // 👈 esto es clave
    dialectOptions: {
      options: {
        trustServerCertificate: true,
        encrypt: false, // 👈 muy importante en entornos locales
      },
    },
    logging: false,
  }
);

export default sequelize;

