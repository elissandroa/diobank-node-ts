import { EntityManager } from "typeorm";
import { AppDataSource } from "../database";
import { User } from "../entities/User";

export class UserRepository {
    private manager: EntityManager;
    
    constructor(manager = AppDataSource.manager){
        this.manager = manager;
    }

    creatUser = async (user:User) => {
        return await this.manager.save(user);
    }
}