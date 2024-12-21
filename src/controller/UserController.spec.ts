import { Request, Response } from "express";
import { UserService } from "../services/UserService";
import { UserController } from "./UserController"
import { Params } from 'express-serve-static-core'

describe('UserController', () => {
    const mockUserService: Partial<UserService> = {

    }

    const userController = new UserController(mockUserService as UserService);
    const makeMockRequest = ({ params, query }: { params?: Params, query?: Params }): Request => {
        const request = {
            params: params || {},
            query: query || {}
        } as unknown

        return request as Request;
    }

    it('Deve adicionar um novo usuário', () => {
        const mockRequest = makeMockRequest({});
        const response = userController.createUser(mockRequest);
    })
})