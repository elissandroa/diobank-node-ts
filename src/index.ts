import express from 'express';
import { Request, Response } from 'express';
import { json } from 'stream/consumers';
import { UserController } from './controller/UserController';

const port = 5000;

const userController = new UserController();

const server = express();

server.use(express.json());

server.get('/', (req: Request, res: Response) => {
    res.status(200).json({ message: 'DioBank API' })
})

server.post('/users', userController.createUser)

server.listen(port, () => {
    console.log(`Server Rodando na porta ${port}!`);
})