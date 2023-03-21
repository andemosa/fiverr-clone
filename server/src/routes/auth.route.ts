import express from "express";

import authCtrl from "../controllers/auth.controller";

import validate from "../middleware/validateResource";

import { LoginSchema, RegisterSchema} from "../schema/user.schema";

const authRouter = express.Router();

authRouter.post("/register", validate(RegisterSchema), authCtrl.register);
authRouter.post("/login", validate(LoginSchema), authCtrl.login);
authRouter.post("/logout", validate(LoginSchema), authCtrl.logout);

export default authRouter;
