import express from 'express';
import { Request, Response } from 'express';
import { json } from 'stream/consumers';
import { router } from './routes';

const port = 5000;


const server = express();

server.use(express.json());

server.use(router);

server.get('/', (req: Request, res: Response) => {
    res.status(200).json({ message: 'DioBank API' })
})

server.listen(port, () => {
    console.log(`Server Rodando na porta ${port}!`);
})