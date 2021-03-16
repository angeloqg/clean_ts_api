import { ServerError } from '../errors/server-error'
import { HttpResponse } from '../protocols/http'
export const badRequest = (erro: Error): HttpResponse => ({
  statusCode: 400,
  body: erro
})

export const serverError = (): HttpResponse => ({
  statusCode: 500,
  body: new ServerError()
})
