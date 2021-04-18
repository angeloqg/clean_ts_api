import { Controller, HttpRequest, HttpResponse } from '../../protocols'
import { badRequest, serverError } from '../../helpers/http-helper'
import { InvalidParamError, MissingParamError } from '../../errors'
import { EmailValidator } from '../signup/signup_protocols'
import { Authentication } from '../../../domain/usecases/authentication'
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

      if (!email) {
        return new Promise(resolve => resolve(badRequest(new MissingParamError('email'))))
      }

      if (!password) {
        return new Promise(resolve => resolve(badRequest(new MissingParamError('password'))))
      }

      const isValid = this.emailValidator.isValid(email)

      if (!isValid) {
        return new Promise(resolve => resolve(badRequest(new InvalidParamError('email'))))
      }

      await this.autentication.auth(email, password)
    } catch (error) {
      return serverError(error)
    }
  }
}
