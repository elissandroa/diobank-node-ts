import { EntityManager } from "typeorm";
import { getMockEntityManager } from "../__mocks__/mockEntityManager.mock"
import { User } from "../entities/User";
import { UserRepository } from "./UserRepository";

describe('UserRepository', () => {
    let userRepository: UserRepository;
    let managerMock: Partial<EntityManager>;

    const mockUser:User = {
        user_id: '12345',
        name: 'Teste User',
        email: 'teste@email.com',
        password: '123456'
    }

    beforeAll(async () => {
        managerMock = await getMockEntityManager({});
        userRepository = new UserRepository(managerMock as EntityManager);
    })

    it('Deve cadastrar um novo usuário no banco de dados', async () => {
        await userRepository.creatUser(mockUser);
        expect(managerMock.save).toHaveBeenCalled();
    })
})