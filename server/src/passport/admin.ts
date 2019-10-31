import { Request, Response } from "express";

export const admin = (req: Request, res: Response, next) => {
  if (req.user && req.user.role === "admin") {
    return next();
  } else {
    return res.status(401).json({ message: "Admin only" });
  }
};
