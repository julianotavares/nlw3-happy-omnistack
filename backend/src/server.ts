import path from 'path';

import 'dotenv/config'
import express from 'express';
import 'express-async-errors';
import cors from 'cors';

import './database/connection';
import routes from './routes';
import errorHandler from './errors/handler';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));
app.use(errorHandler);

app.listen(process.env.PORT || 3333, () => console.log('Server started at http://192.168.31.40:3333'));