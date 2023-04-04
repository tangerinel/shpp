import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import config from "./config/config.js";
import initLibraryDatabase from "./models/database.js";

const startServer = () => {
  const app = express();
  initLibraryDatabase();
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  app.use(express.static(path.join(__dirname, "../static/")));
  app.use(bodyParser.json());
  app.listen(config.server.port, async () => {
    console.log(`SERVER STARTED ON PORT ${config.server.port}`);
  });
};

startServer();
