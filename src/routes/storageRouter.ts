import { Router } from 'express';
import multer from 'multer';

import { uploadAudioFile } from '../firebase/storage';

import checkToken from '../middlewares/checkToken';

const storageRouter = Router();

const upload = multer({ storage: multer.memoryStorage() });

storageRouter.post(
  '/storage/upload',
  checkToken,
  upload.single('file'),
  async (req: any, res: any) => {
    try {
      const user = req.user;

      if (!user) {
        return res.status(401).json({
          message: 'Você precisa estar locado para acessar esse recurso!',
        });
      }

      const file = req.file;

      if (!file) {
        return res.status(400).json({ message: 'Nenhum arquivo foi enviado!' });
      }

      const userId = user.uid as string;

      const fileUrl = await uploadAudioFile(file, userId);

      return res.status(200).json({ fileUrl });
    } catch (error) {
      console.error(error);

      return res
        .status(400)
        .json({ message: 'Internal server error. Try again later.' });
    }
  },
);

export default storageRouter;
