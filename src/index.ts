import express from 'express';
import { Request, Response } from 'express';
import { json } from 'stream/consumers';

const port = 5000;

const server = express();

server.use(express.json());

server.get('/', (req: Request, res: Response) => {
    res.status(200).json({ message: 'DioBank API' })
})

server.post('/users', (req: Request, res: Response) => {
    const body = req.body;
    console.log(body);
    res.status(201).json(body);
})

server.listen(port, () => {
    console.log(`Server Rodando na porta ${port}!`);
})