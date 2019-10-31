import * as express from 'express';

interface UserProps {
  role: "admin" | "user";
  email: string;
}

declare module "express" {
  interface Request {
    user: UserProps
  }

}