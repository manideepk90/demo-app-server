import express from 'express';
import cors from 'cors';
const app = express();
app.use(cors());
app.use(express.static('./dist'));
app.use(express.json());

import serverRouter from './bcknd/serverRouter.js';
import gitRouter from './bcknd/gitRouter.js';
import envRouter from './bcknd/envRouter.js';
import sdkPropsRouter from './bcknd/sdkPropsRouter.js';

import {setup, getActiveServer} from './data/database.js';

const PORT = process.env.PORT || 3004;

await setup();
const data = await getActiveServer();
if (data !== undefined) {
  console.log(data);
}

app.use('/server', serverRouter);
app.use('/git', gitRouter);
app.use('/env', envRouter);
app.use('/sdk-props', sdkPropsRouter);



app.listen(PORT, () =>
  console.log(`Node server listening at http://localhost:${PORT}`),
);
