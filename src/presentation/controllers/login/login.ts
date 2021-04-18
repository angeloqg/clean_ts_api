import { Controller, HttpRequest, HttpResponse, EmailValidator, Authentication } from './login_protocols'
import { badRequest, serverError, unauthorized } from '../../helpers/http-helper'
import { InvalidParamError, MissingParamError } from '../../errors'

export class LoginController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly autentication: Authentication

  constructor (emailValidator: EmailValidator, autentication: Authentication) {
    this.emailValidator = emailValidator
    this.autentication = autentication
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { email, password } = httpRequest.body

      const requiredFiels = ['email', 'password']

      for (const field of requiredFiels) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const isValid = this.emailValidator.isValid(email)

      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }

      const accessToken = await this.autentication.auth(email, password)

      if (!accessToken) {
        return unauthorized()
      }
    } catch (error) {
      return serverError(error)
    }
  }
}
