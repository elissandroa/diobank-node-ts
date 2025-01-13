import { Router } from "express";
import { UserController } from "./controller/UserController";
import { LoginController } from "./controller/LoginController";
import { verifyAuth } from "./midlleware/verifyAuth";

export const router = Router();

const userController = new UserController();
const loginController = new LoginController();

router.post('/users', userController.createUser);
router.get('/users/:userId', verifyAuth, userController.getUser);
router.delete('/users/:id', userController.deleteUser);
router.post('/login', loginController.login); 