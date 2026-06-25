import { Router } from "express";
import { UserController } from "./user.controller";

const router= Router();

router.post('/register', UserController.userRegister);

export const UserRoutes= router;