import dotenv from "dotenv";
dotenv.config();

const MYSQL_USER = process.env.MYSQL_USER || "";
const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD || "";
const MYSQL_HOST = process.env.MYSQL_HOST|| "";
const MYSQL_DATABASE =  process.env.MYSQL_DATABASE || "";
const PORT = process.env.PORT ? process.env.PORT : '3000';

export default {
  mysql: {
    host: MYSQL_HOST,
    user: MYSQL_USER,
    password: MYSQL_PASSWORD,
    database: MYSQL_DATABASE
  },
  server: {
    port: PORT,
  },
};