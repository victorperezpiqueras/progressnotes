import express from 'express';
import { json } from 'body-parser';
import { apiRouter } from './routes/routes';
import mongoose, { ConnectOptions } from 'mongoose';
import { MongoDB } from './db/mongo/mongoose';
import cors from 'cors';
import 'dotenv/config';
import { Console } from 'console';
import path from 'path';

const app = express();

app.use(json());
app.use(cors());

app.use('/api', apiRouter);

const db = MongoDB;

app.get('*', function (req, res, next) {
  //console.log("*")
  res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.sendFile(path.join(__dirname, '../../../dist/index.html'));
});

const port: number = Number(process.env.PORT) || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
