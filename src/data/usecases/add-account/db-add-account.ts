import { AddAccountRepository } from './../../protocols/add-acount-repository'
import { AddAccount, AddAccountModel, AccountModel, Encrypter } from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {
  private readonly encrypter: Encrypter
  private readonly addAcccountRepository: AddAccountRepository

  constructor (encrypter: Encrypter, addAcccountRepository: AddAccountRepository) {
    this.encrypter = encrypter
    this.addAcccountRepository = addAcccountRepository
  }

  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const hashedPassword = await this.encrypter.encrypt(accountData.password)
    const account = await this.addAcccountRepository.add(Object.assign({}, accountData, { password: hashedPassword }))
    return account
  }
}
