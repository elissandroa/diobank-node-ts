import express, { Request, Response } from 'express'
import { UserService } from '../services/UserService';

const userService = new UserService();

export class UserController {

    createUser = (req: Request, res: Response) => {
        const { name, email, password } = req.body;
        
        if(!name){
            res.status(400).json({message: 'Bad request: Nome obrigatório'})
        }
        
        userService.createUser(name, email, password);
        res.status(201).json({ message: 'Usuário criado' });
    }

    getAllUsers = (req: Request, res: Response) => {
        const users = userService.getAllUsers();
        res.status(200).json(users);
    }
}