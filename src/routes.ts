import { Router } from "express";
import { UserController } from "./controller/UserController";

export const router = Router();

const userController = new UserController();


router.post('/users', userController.createUser);
router.get('/users', userController.getAllUsers);
router.delete('/users/:id', userController.deleteUser);