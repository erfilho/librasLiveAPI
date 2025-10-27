import 'dotenv/config';

import cors from 'cors';
import express from 'express';

import welcome from '../middlewares/welcome';

// TODO: STORAGEROUTER
// TODO: SPEECHROUTER
// TODO: RECORDINGROUTER
import transcribeRoute from '../routes/transcribe';
import translateRoute from '../routes/translate';
import transcriptionRoute from '../routes/transription';
import userRouter from '../routes/userRouter';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/', welcome);

app.use('/transcribe', transcribeRoute);
app.use('/translate', translateRoute);
app.use('/transcription', transcriptionRoute);

app.use(userRouter);

export default app;
