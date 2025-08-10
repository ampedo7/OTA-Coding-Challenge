import { Dialect } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

export default {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: (process.env.DB_DIALECT as Dialect) || 'mysql'
  },
  test: {
    username: 'root',
    password: '',
    database: 'test_database',
    host: '127.0.0.1',
    dialect: 'mysql'
  },
  production: {
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_DATABASE || 'prod_db',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: (process.env.DB_DIALECT as Dialect) || 'mysql'
  }
};
