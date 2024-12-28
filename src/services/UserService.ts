export interface IUser {
    name: string;
    email: string;
    password: string;
}

const db = [
    {
        name: "Joana",
        email: "joana@diobank.com",
        password: "123456"
    }
]

export class UserService {

    db: IUser[];
    constructor(
        database = db
    ) {
        this.db = database;
    }

    createUser = (name: string, email: string, password: string) => {

        const user = {
            name,
            email,
            password
        }

        this.db.push(user);

        console.log("DB Atualizado!", this.db);
    }

    getAllUsers = () => {
        return db;
    }

    deleteUser = (id:number) => {
        console.log('Deletando o usuario:', id);
        return id;
    }

}