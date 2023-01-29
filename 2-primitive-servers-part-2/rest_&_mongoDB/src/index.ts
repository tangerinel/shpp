"use strict";
import express from "express";
import mongoose, { ObjectId } from "mongoose";
import {join} from "path";
import bodyParser from "body-parser";
import { config } from "./config/config";
import itemRouter from "./routers/ItemRouter";
import sessionRouter from "./routers/sessionRouter";
import cors from "cors";
import session from "express-session";
import MongoStore  from 'connect-mongo';



declare module 'express-session' {
  export interface SessionData {
    userId: ObjectId;
  }
}

/** Connect to Mongo */
mongoose
  .connect(config.mongo.url)
  .then(() => {
    console.log("Mongo connected successfully.");
    startServer();
  })
  .catch((error) => console.log(error));

/** starts server if mongoose connected */
const startServer: Function = () => {
  const app = express();

  //to use cors instead of express.static uncoment this
  // app.use(
  //   cors({
  //     origin: ["http://localhost:8080"],
  //     credentials: true,
  //   })
  // );

  app.use(express.static(join(__dirname, "../static")));

  app.use(bodyParser.json());
  
  app.use(session({
    store: MongoStore.create({ mongoUrl: config.mongo.url}),
    secret: 'very secret secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 3, // 3 hours
      httpOnly: true
  }
}));
  app.use("/", itemRouter, sessionRouter);

  app.listen(config.server.port, () =>
    console.log(`SERVER STARTED ON PORT ${config.server.port}`)
  );
};
