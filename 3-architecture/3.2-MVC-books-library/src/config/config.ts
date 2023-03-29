import dotenv from "dotenv";

dotenv.config();

const MYSQL_USER: string = process.env.MYSQL_USER || "";
const MYSQL_PASSWORD: string = process.env.MYSQL_PASSWORD || "";
const MYSQL_DATABASE: string =  process.env.MYSQL_DATABASE || "";
const PORT: number = process.env.PORT ? Number(process.env.PORT) : 3000;

export const config = {
  mysql: {
    user: MYSQL_USER,
    password: MYSQL_PASSWORD,
    database: MYSQL_DATABASE
  },
  server: {
    port: PORT,
  },
};