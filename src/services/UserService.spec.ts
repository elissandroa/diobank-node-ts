import { mock } from "node:test";
import { IUser, UserService } from "./UserService"

describe('UserService', () => {
    const mockDb:IUser[] = []
    const userservice  = new UserService(mockDb);
    it('Deve adicionar um novo usuário', () => {
        const mockConsole = jest.spyOn(global.console, 'log');
        userservice.createUser('Elissandro', 'elissandro@email.com', '123456');
        expect(mockConsole).toHaveBeenCalledWith('DB Atualizado!', mockDb);
    })
})