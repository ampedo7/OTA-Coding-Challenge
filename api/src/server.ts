import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './router';
// import sequelize from './database/connection';
import orm from './services/sequelize';

dotenv.config();

const app = express();

// sequelize.sync().then(() => {
//   console.log('connected!');
// });
orm
  .sync()
  .then(() => {
    console.log('Database synced');
  })
  .catch((err: unknown) => {
    console.error('Failed to sync database:', err);
  });

app.use(cors());
app.use(express.json());

app.use('/api', router());

app.listen(process.env.PORT, () => {
  console.log('listening port', process.env.PORT);
});
