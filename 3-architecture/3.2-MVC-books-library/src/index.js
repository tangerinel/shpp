import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import config from "./config/config.js";
import { initLibraryDatabase } from "./models/database.js";
import { startCron } from "./models/cron.js";

const startServer = async () => {
  const app = express();

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  app.use(express.static(path.join(__dirname, "../static/")));
  app.use(bodyParser.json());
  app.listen(config.server.port, () => {
    console.log(`SERVER STARTED ON PORT ${config.server.port}`);
    initLibraryDatabase();
    startCron();
  });
};

startServer();
