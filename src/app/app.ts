import cors from 'cors';
import express from 'express';

import welcome from '../middlewares/welcome';

import transcribeRoute from '../routes/transcribe';
import translateRoute from '../routes/translate';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/', welcome);

app.use('/transcribe', transcribeRoute);
app.use('/translate', translateRoute);

export default app;
