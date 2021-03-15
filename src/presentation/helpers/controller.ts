import { HttpRequest, HttpResponse } from '../protocolos/http'

export interface Controller {
  handle (httpRequest: HttpRequest): HttpResponse
}
