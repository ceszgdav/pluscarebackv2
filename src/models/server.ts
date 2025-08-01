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

import http from 'http';
import { Server } from 'socket.io';
import { verifyToken } from '../utils/handleJwt';
import { handleRepartidorSockets } from '../sockets/dealer.sockets';

const pathStorage = `${process.cwd()}/src/storage/tmp`;

class ServerApp {

  private app: Application;
  private port: number | string;
  private server: http.Server;
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

    this.server = http.createServer(this.app);
    const io = new Server(this.server, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
    });

    io.use((socket, next) => {
      const token = socket.handshake.auth.token;
      const user = verifyToken(token);
      if (!user) return next(new Error('Unauthorized'));
      socket.data.user = user;
      next();
    })

    io.on('connection', (socket) => {
      console.log('Client connected:', socket.data.user.id);

      handleRepartidorSockets(socket, io);

      socket.on('disconnect', () => {
        console.log('Client disconnected');
      });
    });
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
    this.server.listen(this.port, () => {
      console.log(`Servidor corriendo en http://localhost:${this.port}`);
    });
  }

}

export default ServerApp;