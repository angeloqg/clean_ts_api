import { Controller } from './../helpers/controller'
import { MissingParamError } from '../errors/missing-param-erros'
import { badRequest } from '../helpers/http-helper'
import { HttpRequest, HttpResponse } from './../protocolos/http'
export class SignUpController implements Controller {
  handle (httpRequest: HttpRequest): HttpResponse {
    const requiredFiels = ['name', 'email', 'password', 'passwordConfirmation']

    for (const field of requiredFiels) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }
  }
}
