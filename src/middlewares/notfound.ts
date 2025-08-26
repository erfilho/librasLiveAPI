import {NextFunction, Request, Response} from "express";

export default function welcome(
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.status(404).json({message: "Welcome to LibrasLive API."});
}
