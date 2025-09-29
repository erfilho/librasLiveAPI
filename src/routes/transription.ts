import express from 'express';

const router = express.Router();

// TODO: Load a welcome message
router.get('/', async (req, res) => {
  res
    .status(200)
    .json({ message: 'Welcome to LibrasLive Transcriptions API.' });
});

// TODO: load all transcriptions by userUUID
router.get('/getAll', async (req, res) => {
  res.status(200).json({ message: 'ok' });
});

// TODO: save one transcription for a user with all info's
router.post('/save', async (req, res) => {});

// TODO: Edit infos about one saved transcription
router.put('/edit', async (req, res) => {});

// TODO: Delete one transcription by id
router.delete('/delete/:id', async (req, res) => {});

// TODO: Get all data about a transcription by Id
router.get('/getTranscription/:id', async (req, res) => {});

export default router;
