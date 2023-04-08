import mysql from "mysql2";
import config from "./config.js";

export default mysql.createConnection({
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  // database: config.mysql.database,
});
