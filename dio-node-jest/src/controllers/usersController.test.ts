import { Request } from "express";
import { UsersController } from "./usersController"
import { makeMockResponse } from "../mocks/mockResponse";

describe('Users Controller', () => {
    const usersController = new UsersController();

    const mockRequest = {} as Request
    const mockResponse = makeMockResponse()
    it('Deve listar os nossos usuários', () => {
        usersController.listarUsuario(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(200)
        expect(mockResponse.state.json).toHaveLength(4)
    })

    it('Deve criar um novo usuário', () => {
        mockRequest.body = {
            name: 'Novo Usuário'
        }

        usersController.criarUsuario(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(201)
        expect(mockResponse.state.json).toMatchObject({ 'mensagem': `Usuário Novo Usuário criado` })
    })

    it('Não deve criar um usuário com o nome em branco', () => {
        mockRequest.body = {
            name: ''
        }

        usersController.criarUsuario(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(403)
        expect(mockResponse.state.json).toMatchObject({ 'mensagem': 'Não é possível criar usuários sem um nome.' })
    })
})