import { DecodedIdToken, getAuth } from 'firebase-admin/auth';
import { CreateUserRequest } from '../interfaces/User';
import app from './app';

const auth = getAuth(app);

async function createUser({ email, password }: CreateUserRequest) {
  const userRecord = await auth.createUser({
    email,
    password,
  });
  return userRecord;
}

async function updateUser(uid: string, { email }: { email: string }) {
  const userRecord = await auth.updateUser(uid, {
    email,
  });
  return userRecord;
}

async function updateUserPassword(uid: string, password: string) {
  const userRecord = await auth.updateUser(uid, { password });
  return userRecord;
}

async function deleteUser(uid: string) {
  await auth.deleteUser(uid);
}

async function verifyToken(token: string) {
  let decoded: DecodedIdToken | null = null;
  try {
    decoded = await auth.verifyIdToken(token);
  } catch (error) {
    console.error(error);
  }
  return decoded;
}

export { createUser, deleteUser, updateUser, updateUserPassword, verifyToken };
