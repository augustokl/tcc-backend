import 'reflect-metadata';
import 'dotenv/config';
import express from 'express';

import routes from './routes';

const app = express();
const url = process.env.APP_API_URL;
const port = process.env.APP_API_PORT;

import '@shared/infra/typeorm';
import '@shared/container';

app.use(express.json());
app.use(routes);

app.listen(port, () => {
  console.log(`💥 Server Start! ${url}:${port}`);
});
