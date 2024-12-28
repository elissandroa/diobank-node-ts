import express, { Request, Response } from 'express'
import { UserService } from '../services/UserService';


export class UserController {
    userService: UserService;

    constructor(userService = new UserService()) {
        this.userService = userService;
    }

    createUser = (req: Request, res: Response) => {
        const { name, email, password } = req.body;

        if (!name) {
            res.status(400).json({ message: 'Bad request: Nome obrigatório' })
            return;
        }

        if (!email) {
            res.status(400).json({ message: 'Bad request: Email obrigatório' })
            return;
        }

        this.userService.createUser(name, email, password);
        res.status(201).json({ message: 'Usuário criado' });
    }

    getAllUsers = (req: Request, res: Response) => {
        const users = this.userService.getAllUsers();
        res.status(200).json(users);
    }


    deleteUser = (req: Request, res: Response) => {
        const { id } = req.params;
        const user = this.userService.deleteUser(parseInt(id));
        res.status(204).json({message:`Usuário deletado: ${id}`});
    }
}