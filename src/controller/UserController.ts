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

        if (!password) {
            res.status(400).json({ message: 'Bad request: Senha obrigatória' })
            return;
        }

        this.userService.createUser(name, email, password);
        res.status(201).json({ message: 'Usuário criado' });
    }

    getUser = async (req: Request, res: Response) => {
        const { userId } = req.params;

        if (!userId) {
            res.status(400).json({ message: 'Bad request: userId is required' });
            return;
        }

        try {
            const user = await this.userService.getUser(userId);
            if (user) {
                res.status(200).json({
                    user: {
                        id: user.user_id,
                        name: user.name,
                        email: user.email,
                    }   
                });
             } else {
                res.status(404).json({ message: 'User not found' });
                return;
            }
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
            return;
        }
    }

    deleteUser = (req: Request, res: Response) => {
        const { id } = req.params;
        const user = this.userService.deleteUser(parseInt(id));
        res.status(204).json({ message: `Usuário deletado: ${id}` });
    }

}