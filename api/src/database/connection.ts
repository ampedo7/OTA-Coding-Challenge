import { Sequelize } from 'sequelize-typescript';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();

const modelsPath = path.resolve(__dirname, '../models');

const modelFiles = fs
  .readdirSync(modelsPath)
  .filter((file) => file.endsWith('.ts') || file.endsWith('.js'))
  .map((file) => require(path.join(modelsPath, file)).default);

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  models: modelFiles,
  logging: false
});

export default sequelize;
