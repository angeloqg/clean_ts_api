import request from 'supertest'
import app from '../config/app'

describe('SignUp Routes', () => {
  test('Should return and account on success', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: '',
        email: '',
        password: '',
        passwordConfirmation: ''
      })

    expect(app.response.statusCode).toBe(200)
  })
})
