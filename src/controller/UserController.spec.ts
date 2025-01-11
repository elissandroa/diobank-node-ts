import { Request } from "express";
import { UserService } from "../services/UserService";
import { UserController } from "./UserController";
import { makeMockResponse } from "../__mocks__/mockResponse.mock";
import { makeMockRequest } from "../__mocks__/mockRequest.mock";
import { create } from "domain";

jest.mock('../database', () => {
    initialize: jest.fn()
})

const mockUserService = {
    createUser: jest.fn(),
    getUser: jest.fn()  
}

jest.mock('../services/UserService', () => {
    return {
        UserService: jest.fn().mockImplementation(() => {
            return mockUserService;
        })
    }
});

describe('UserController', () => {
       
    

    const userController = new UserController();

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

    it('Deve verificar se a função getUser() está sendo chamada', () => {
        const mockResponse = makeMockResponse();
        const mockRequest = {
            body: {}
        } as Request
        userController.getUser(mockRequest, mockResponse);
        expect(mockResponse.state.status).toBe(200);
        expect(mockUserService.getUser).toHaveBeenCalled();
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

    it('Deve informar um erro caso o Password não seja informado', () => {
        const mockResponse = makeMockResponse();
        const mockRequest = {
            body: {
                name: "João",
                email: "teste@email.com"
            }
        } as Request
        userController.createUser(mockRequest, mockResponse);
        expect(mockResponse.state.status).toBe(400);
        expect(mockResponse.state.json).toMatchObject({message:'Bad request: Senha obrigatória'})
    })
})