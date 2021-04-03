import { makeSignupController } from './../factories/signup'
import { adaptRoute } from './../adapters/express-route-adapter'

export default (router): void => {
  router.post('/signup', (adaptRoute(makeSignupController())))
}
