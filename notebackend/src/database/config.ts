import msssql from 'mssql';
import * as dotenv from 'dotenv';
dotenv.config();

export const config = {
  user: process.env.DB_USER as string,
  password: process.env.DB_PASSWORD as string,
  server: process.env.DB_SERVER as string,
  database: process.env.DB_DATABASE as string,
  options: {
    encrypt: true,
    trustServerCertificate: true
  }
};

