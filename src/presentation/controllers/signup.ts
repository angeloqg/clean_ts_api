import { InvalidParamError, MissingParamError } from '../errors'
import { badRequest, serverError, EmailValidator, Controller } from '../helpers'
import { HttpRequest, HttpResponse } from './../protocolos/http'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator

  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFiels = [
        'name',
        'email',
        'password',
        'passwordConfirmation'
      ]

      for (const field of requiredFiels) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const isValid = this.emailValidator.isValid(httpRequest.body.email)

      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }
    } catch (error) {
      return serverError()
    }
  }
}
