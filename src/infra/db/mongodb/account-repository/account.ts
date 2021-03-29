import { MongoHelper } from './../helpers/mongo-helper'
import { AccountModel } from '../../../../domain/models/account'
import { AddAccountModel } from '../../../../domain/usecases/add-account'
import { AddAccountRepository } from './../../../../data/protocols/add-acount-repository'

export class AccountMongoRepository implements AddAccountRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(accountData)
    const account = result.ops[0]
    const { _id, ...accountWithOutId } = account
    return Object.assign({}, accountWithOutId, { id: _id })
  }
}
