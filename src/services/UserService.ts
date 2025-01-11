import { AppDataSource } from "../database";
import { UserRepository } from "../repositories/UserRepository";
import { User } from "../entities/User";
export class UserService {

    private userRepository: UserRepository;

    constructor(
        userRepository = new UserRepository(AppDataSource.manager)
    ) {
        this.userRepository = userRepository;   
    }

    createUser = async (name: string, email: string, password: string):Promise<User> => {
        const user = await new User(name, email, password);  
        return this.userRepository.createUser(user);
    }

    getUser = () => {
    }

    deleteUser = (id:number) => {
        console.log('Deletando o usuario:', id);
        return id;
    }


}