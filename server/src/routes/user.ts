import { Router } from "express";
import { logged } from "../passport/logged";

import * as user from "../controllers/user";

export const router = Router();

router.get("/user", logged, user.userGet);

// router.get("/user/sub", logged, user.userGetSubs);

// router.get("/user/follows", logged, user.userGetFollows);

// router.get("/user/:id", user.userGetId);

// router.post("/user", user.userPost);

// router.put("/user/:id", user.userPutId);

// router.delete("/user/:id", user.userDeleteId);
