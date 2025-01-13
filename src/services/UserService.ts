import { AppDataSource } from "../database";
import { UserRepository } from "../repositories/UserRepository";
import { User } from "../entities/User";
import { sign } from "jsonwebtoken";
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

    getUser = (userId:string):Promise<User | null> => {
        return this.userRepository.getUser(userId);
    }

    getAuthenticatedUser = (email: string, password: string) => {  
        return this.userRepository.getUserByEmailAndPassword(email, password);
     }

    getToken = async (email:string, password:string):Promise<string> => {   
        const user = await this.getAuthenticatedUser(email, password);
        
        if(!user) {
            throw new Error('Email / password invalid!');
        }
        
        const tokenData = {
            email: user?.email,
            password: user?.password
        }

        const tokenKey = '123456789'

        const tokenOptions = {
            subject: user?.user_id,
        }

        const token = sign(tokenData, tokenKey, tokenOptions);

        return token
     } 



    deleteUser = (id:number) => {
        console.log('Deletando o usuario:', id);
        return id;
    }


}