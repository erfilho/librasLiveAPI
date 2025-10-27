import { Router } from 'express';

import {
  createUser,
  deleteUser,
  updateUser,
  updateUserPassword,
} from '../firebase/auth';

import User from '../interfaces/User';
import checkToken from '../middlewares/checkToken';

const userRouter = Router();

// INFO: route for user creation
userRouter.post('/users', async (req: any, res: any) => {
  try {
    const { email, password } = req.body as User;

    if (!email || !password) {
      return res.status(400).json({
        message: 'Faltam informações, verifique e tente novamente.',
      });
    }

    const user = await createUser({ email, password });

    return res.status(201).json({
      message: 'Usuário cadastrado com sucesso!',
      user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Internal server error. Try again later.',
    });
  }
});

// INFO: route for get users data
userRouter.get('/users/me', checkToken, async (req: any, res: any) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({
        message: 'Você precisa estar locado para acessar esse recurso!',
      });
    }

    const { email } = user;
    const data = { email };

    return res.status(200).json(data);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: 'Internal server error. Try again later.',
    });
  }
});

// INFO: route for update user data
userRouter.put('/users', checkToken, async (req: any, res: any) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({
        message: 'Você precisa estar locado para acessar esse recurso!',
      });
    }

    const userId = user.uid as string;
    const { email } = req.body;
    const data = email;
    const result = await updateUser(userId, data);

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      message: 'Internal server error. Try again later.',
    });
  }
});

// INFO: route for update user password
userRouter.put('/users/password', checkToken, async (req: any, res: any) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({
        message: 'Você precisa estar logado para acessar este recurso.',
      });
    }

    const { newPassword, confirmPassword } = req.body;
    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        message: 'As senhas não coincidem. Verifique e tente novamente.',
      });
    }

    const userId = user.uid as string;
    const result = await updateUserPassword(userId, newPassword);

    return res.status(200).json(result);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: 'Internal server error. Try again later.',
    });
  }
});

// INFO: route for delete user
userRouter.delete('/users', checkToken, async (req: any, res: any) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({
        message: 'Você precisa estar logado para acessar este recurso.',
      });
    }

    const userId = user.uid;

    await deleteUser(userId);

    return res.status(200).json({
      message: 'Usuário deletado com sucesso!',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Internal server error. Try again later.',
    });
  }
});

export default userRouter;
