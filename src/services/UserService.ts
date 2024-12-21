const db = [
    {
        name: "Joana",
        email: "joana@diobank.com",
        password: "123456"
    }
]

export class UserService {

    createUser = (name: string, email: string, password: string) => {
        const user = {
            name,
            email,
            password
        }

        db.push(user);

        console.log("DB Atualizado!",db);
    }

    getAllUsers = () => {
        return db;
    }

}