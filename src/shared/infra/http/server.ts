import 'dotenv/config';
import express from 'express';

const app = express();
const url = process.env.APP_API_URL;
const port = process.env.APP_API_PORT;

import '@shared/infra/typeorm';

app.use(express.json());

app.listen(port, () => {
  console.log(`💥 Server Start! ${url}:${port}`);
});
