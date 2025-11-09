import { getFirestore } from 'firebase-admin/firestore';
import app from './app';

const db = getFirestore(app);

export const saveTranscription = async (transcription: any): Promise<any> => {
  try {
    const docRef = await db.collection('recorders').add(transcription);
    const doc = await docRef.get();
    return { ...doc.data(), id: doc.id };
  } catch (error) {
    console.error('Error saving transcription: ', error);
    throw new Error('Failed to save transcription');
  }
};

export const getAllTranscriptions = async (): Promise<any> => {
  const colRef = await db.collection('recorders');
  const docs = await colRef.get();
  const data: any[] = [];
  docs.forEach((doc) => {
    data.push({ ...doc.data(), id: doc.id });
  });
  return data;
};
