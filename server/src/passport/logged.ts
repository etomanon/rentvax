import { Request, Response } from "express";

export const logged = (req: Request, res: Response, next) => {
  if (req.user) {
    return next();
  } else {
    return res.status(401).json({ message: "Not logged in" });
  }
};
