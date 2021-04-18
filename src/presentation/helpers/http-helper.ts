import { ServerError, UnauthorizedError } from '../errors'
import { HttpResponse } from '../protocols/http'

export const badRequest = (erro: Error): HttpResponse => ({
  statusCode: 400,
  body: erro
})

export const unauthorized = (): HttpResponse => ({
  statusCode: 401,
  body: new UnauthorizedError()
})

export const serverError = (erro: Error): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(erro.stack)
})

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data
})
