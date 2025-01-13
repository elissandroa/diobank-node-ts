import { UserService } from "./UserService"
import { UserRepository } from "../repositories/UserRepository";
import * as jwt from 'jsonwebtoken';

jest.mock('../repositories/UserRepository');
jest.mock('../database', () => {
    initialize: jest.fn()
})
jest.mock('jsonwebtoken');



const mockUserRepository = require('../repositories/UserRepository');
const mockUser = {
    user_id: '123456',
    name: 'Elissandro',
    email: 'elissandro@email.com',
    password: '123456'
}

describe('UserService', () => {
    const userService = new UserService(mockUserRepository);

    it('Deve adicionar um novo usuário', async () => {
        mockUserRepository.createUser = jest.fn().mockImplementation(() => Promise.resolve(mockUser));
        const response = await userService.createUser('Elissandro', 'elissandro@email.com', '123456');
        expect(mockUserRepository.createUser).toHaveBeenCalled();
        expect(response).toMatchObject({
            user_id: '123456',
            name: 'Elissandro',
            email: 'elissandro@email.com',
            password: '123456'
        });
    });

    it('Deve retornar um token de usuário', async () => {
        jest.spyOn(userService, 'getAuthenticatedUser').mockImplementation(() => Promise.resolve(mockUser));
        jest.spyOn(jwt, 'sign').mockImplementation(() => 'token');
        const token = await userService.getToken('elissandro@email.com', '123456');
        expect(token).toBe('token');
    });

    it('Deve retornar um erro caso não encontre um usuário autenticado', async () => {
        jest.spyOn(userService, 'getAuthenticatedUser').mockImplementation(() => Promise.resolve(null));
        await expect(userService.getToken('testError@email.com', '654321')).rejects.toThrow('Email / password invalid!');
     })
});