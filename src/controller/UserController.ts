import express, {Request, Response} from 'express'


const db = [
    {
        name: "Joana",
        email: "joana@diobank.com",
        password: "123456"
    }
]


export class UserController {

    createUser = (req: Request, res: Response) => {
        const user = req.body;
        db.push(user);
        console.log(db);
        res.status(201).json(user);
    }
}