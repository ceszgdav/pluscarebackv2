import { DataSource } from "typeorm";
import dotenv from 'dotenv';
import path = require('path');

dotenv.config({
  path: path.resolve(`${process.cwd()}/.env.${process.env.NODE_ENV}`)
});

//POSTGRE DATABASE
const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [
    "src/entity/**/*.{ts, js}",
    "src/entity/**/**/*.{ts, js}"
  ],
  logging: false,
  synchronize: true,
})

export { AppDataSource };