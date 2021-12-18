import express from 'express';
import { json } from 'body-parser';
import { apiRouter } from './routes/routes';
import mongoose, { ConnectOptions } from 'mongoose';
import { MongoDB } from './db/mongo/mongoose';
import cors from 'cors';
import 'dotenv/config';
import { Console } from 'console';

const app = express();

app.use(json());
app.use(cors());

app.use('/api', apiRouter);

const db = MongoDB;

const port: number = Number(process.env.PORT) || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
