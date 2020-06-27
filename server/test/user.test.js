const request = require('supertest');
const app = require('../app.js');
const { queryInterface } = require('../models').sequelize;
const { encrypt } = require('../helpers/bcrypt.js')

let user = {
    email: 'user@example.com',
    password: '123456',
    role: 'admin'
}
// create
beforeAll((done) => {
    queryInterface.bulkInsert('Users', [
        {
            email: user.email,
            password: encrypt(user.password),
            role: user.role,
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ])
        .then(() => {
            done()
        })
})

afterAll((done) => {
    queryInterface.bulkDelete('Users')
        .then(() => {
            done()
        })
})

describe('Login user', () => {
    describe('Success login', () => {
        it('Return status code 200 with token and data', (done) => {
            let loginUser = {
                email: user.email,
                password: user.password
            }
            request(app)
                .post('/login')
                .send(loginUser)
                .then((response) => {
                    // console.log(response.body)
                    const { body, status } = response
                    expect(status).toBe(200)
                    expect(body).toHaveProperty('id', expect.any(Number))
                    expect(body).toHaveProperty('email', user.email)
                    expect(body).toHaveProperty('token', expect.any(String))
                    done()
                })
        })
    })

    describe('Failed login', () => {
        describe('Email not found', () => {
            it('Return status code 404 with message', (done) => {
                let loginUser = {
                    email: 'wrong@email.com',
                    password: '123456'
                }
                request(app)
                    .post('/login')
                    .send(loginUser)
                    .then((response) => {
                        // console.log(response.body)
                        const { body, status } = response
                        expect(status).toBe(404)
                        expect(body).toHaveProperty('message', "Invalid email/password")
                        done()
                    })
            })
        })
        describe('Wrong password', () => {
            it('Return status code 400 with message', (done) => {
                let loginUser = {
                    email: user.email,
                    password: '111111'
                }
                request(app)
                    .post('/login')
                    .send(loginUser)
                    .then((response) => {
                        // console.log(response.body)
                        const { body, status } = response
                        expect(status).toBe(400)
                        expect(body).toHaveProperty('message', "Invalid email/password")
                        done()
                    })
            })
        })
    })
})


