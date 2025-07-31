import dotenv from 'dotenv';
import * as fs from 'fs';
import path = require('path');

dotenv.config({
  path: path.resolve(`${process.cwd()}/.env.${process.env.NODE_ENV}`)
});

import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import router from '../routes';
import { AppDataSource } from '../config/connection';
const pathStorage = `${process.cwd()}/src/storage/tmp`;

class Server {

  private app: Application;
  private port: number | string;

  constructor() {
    this.app = express();
    this.app.use(morgan('dev'));
    this.app.use(cors());
    this.app.use(express.json());

    if (process.env.NODE_ENV == 'development') {
      this.port = process.env.PORT || 3000;
    } else {
      this.port = process.env.PORT || 3000;
    }

    this.dbConnection();
    this.registerRoutes();

    //Public folder to acces files since front
    this.app.use(express.static(pathStorage));

  }

  async dbConnection() {

    try {

      await AppDataSource.initialize();

      console.log('<<< connection to DATABASE succeed >>>')

    } catch (err) {

      console.log('<<< error DATABASE connection >>>', err)

    }

  }

  private async registerRoutes() {
    this.app.use("/api", router);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en http://localhost:${this.port}`);
    });
  }

}

export default Server;