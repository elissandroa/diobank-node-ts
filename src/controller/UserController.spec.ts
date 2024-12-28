import { Request } from "express";
import { UserService } from "../services/UserService";
import { UserController } from "./UserController";
import { makeMockResponse } from "../__mocks__/mockResponse.mock";

describe('UserController', () => {

    const mockUserService: Partial<UserService> = {
        createUser: jest.fn()
    }

    const userController = new UserController(mockUserService as UserService);

    it('Deve adicionar um novo usuário', () => {
        const mockRequest = {
            body: {
                name: "Elissandro",
                email: "elissandro@diobank.com",
                password: "123456"
            }
        } as Request;
        const MockResponse = makeMockResponse();
        userController.createUser(mockRequest, MockResponse);
        expect(MockResponse.state.status).toBe(201);
        expect(MockResponse.state.json).toMatchObject({ message: 'Usuário criado' });
    })
    it('Deve informar um erro caso name não seja informado', () => {
        const mockRequest = {
            body: {
                email: "elissandro@diobank.com",
                password: "123456"
            }
        } as Request;
        const MockResponse = makeMockResponse();
        userController.createUser(mockRequest, MockResponse);
        expect(MockResponse.state.status).toBe(400);
        expect(MockResponse.state.json).toMatchObject({ message: 'Bad request: Nome obrigatório' });
    })
})