import { authenticate } from "passport";
import { Router } from "express";

import * as auth from "../controllers/auth";

export const router = Router();

router.get(
  "/auth/google",
  authenticate("google", {
    scope: ["email", "profile"]
  })
);

router.get(
  "/auth/google/callback",
  authenticate("google", {
    failureRedirect: "/",
    successRedirect: "/dashboard"
  })
);

router.get("/auth/logout", auth.authGetLogout);
