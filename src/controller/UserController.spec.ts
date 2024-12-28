import { Request } from "express";
import { UserService } from "../services/UserService";
import { UserController } from "./UserController";
import { makeMockResponse } from "../__mocks__/mockResponse.mock";
import { makeMockRequest } from "../__mocks__/mockRequest.mock";

describe('UserController', () => {


    const mockUserService: Partial<UserService> = {
        createUser: jest.fn(),
        getAllUsers: jest.fn()
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

    it('Deve verificar se a função getAllUsers() está sendo chamada', () => {
        const mockResponse = makeMockResponse();
        const mockRequest = {
            body: {}
        } as Request
        userController.getAllUsers(mockRequest, mockResponse);
        expect(mockResponse.state.status).toBe(200);
        expect(mockUserService.getAllUsers).toHaveBeenCalled();
    })

    it('Deve informar um erro caso Email não seja informado', () => {
        const mockResponse = makeMockResponse();
        const mockRequest = {
            body: {
                name: "João",
                password: "123456"
            }
        } as Request
        userController.createUser(mockRequest, mockResponse);
        expect(mockResponse.state.status).toBe(400);
        expect(mockResponse.state.json).toMatchObject({message:'Bad request: Email obrigatório'})
    })
   
})