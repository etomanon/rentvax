import * as express from "express";

interface UserProps {
  id: number;
  role: "admin" | "user";
  email: string;
}

declare module "express" {
  interface Request {
    user: UserProps;
  }
}
