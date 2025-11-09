import app from './app';

import { getStorage } from 'firebase-admin/storage';

const storage = getStorage(app);

async function uploadAudioFile(file: Express.Multer.File, userUid: string) {
  try {
    const bucket = storage.bucket();
    const fileName = `${userUid}_${Date.now()}`;
    const fileUpload = bucket.file(fileName);

    const stream = fileUpload.createWriteStream({
      metadata: { contentType: file.mimetype },
    });

    const downloadUrl = await new Promise<string>((resolve, reject) => {
      stream.on('error', (error) => {
        console.error(error);
        reject('Falha no envio do arquivo. Tente novamente mais tarde.');
      });

      stream.on('finish', async () => {
        await fileUpload.makePublic();
        const downloadUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
        resolve(downloadUrl);
      });

      stream.end(file.buffer);
    });

    return downloadUrl;
  } catch (error) {
    console.error('Error uploading audio file: ', error);
    throw new Error('Failed to upload audio file');
  }
}

export { uploadAudioFile };
