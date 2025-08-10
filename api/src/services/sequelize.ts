import path from 'path';
import { Sequelize } from 'sequelize';
import DB from '../database/connection';

interface Orm {
  [key: string]: any;
  sequelize: Sequelize;
  Sequelize: typeof Sequelize;
  sync: () => Promise<Sequelize>;
  seed: () => Promise<Sequelize>;
  query: (...args: any[]) => Promise<any>;
}

const orm: Orm = {} as Orm;

// // Setup associations
// Object.keys(orm).forEach((modelName) => {
//   if (orm[modelName]?.associate) {
//     orm[modelName].associate(orm);
//   }
// });

// Attach Sequelize instance and library
orm.sequelize = DB;
orm.Sequelize = Sequelize;

// Sync and Seed utilities
orm.sync = async () => {
  return DB.sync({ alter: true });
};

orm.seed = async () => {
  return DB.sync({});
};

// Query wrapper
// orm.query = async function (...args: any[]): Promise<any> {
//   try {
//     return await DB.query(...args);
//   } catch (err) {
//     console.error('Query error:', err);
//     throw err;
//   }
// };

// Handle unhandled rejections
process.on('unhandledRejection', (reason, promise) => {
  console.log('Caught in unhandledRejection:', reason);
});

export default orm;
