import mysql from 'mysql2';
import {config} from "./config";

export default mysql.createPool({
    host: config.server.port,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
  }).promise();
