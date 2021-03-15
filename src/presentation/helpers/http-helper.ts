import { HttpResponse } from './../protocolos/http'
export const badRequest = (erro: Error): HttpResponse => ({
  statusCode: 400,
  body: erro
})
