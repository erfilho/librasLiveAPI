import { NextFunction, Request, RequestHandler, Response } from 'express';
import { verifyToken } from '../firebase/auth';
import User from '../interfaces/User';

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

const checkToken: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      res
        .status(403)
        .json({ message: 'Acess denied: No authorization token founded' });
      return;
    }

    const user = await verifyToken(authorization);

    if (!user) {
      res.status(403).json({ message: 'Acess denied: Invalid token' });
      return;
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({
      message: 'Internal server error. Try again later.',
    });
  }
};

export default checkToken;
