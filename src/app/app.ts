import 'dotenv/config';

import cors from 'cors';
import express from 'express';

import welcome from '../middlewares/welcome';

// TODO: SPEECHROUTER
// TODO: RECORDINGROUTER
import storageRouter from '../routes/storageRouter';
import transcribeRoute from '../routes/transcribe';
import translateRoute from '../routes/translate';
import userRouter from '../routes/userRouter';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/', welcome);

app.use('/transcribe', transcribeRoute);
app.use('/translate', translateRoute);
app.use('/transcription', transcriptionRoute);

app.use(userRouter);
app.use(storageRouter);

export default app;
