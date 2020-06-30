const request = require('supertest');
const app = require('../app.js');
const { queryInterface } = require('../models').sequelize;
const { User } = require('../models')
const { encrypt } = require('../helpers/bcrypt.js');
const { generateToken } = require('../helpers/jwt.js');

let user = {
    email: 'user@example.com',
    password: '1234567',
    role: 'admin'
}

let token;
let id;

beforeAll((done) => {
    User.create(user)
        .then((data) => {
            const { id, email } = data
            token = generateToken({ id, email })
            done();
        })
        .catch((err) => done(err));
})

afterAll((done) => {
    return queryInterface.bulkDelete('Products')
        .then(() => {
            return queryInterface.bulkDelete('Users')
        })
        .then(() => {
            done()
        })
})

describe('Create new product', () => {
    describe('Success to create new product', () => {
        it('Return status code 201 with data new product', (done) => {
            let newProduct = {
                name: 'Asus 1234',
                image_url: 'http://your-image-url.com/img.png',
                price: 3000000,
                stock: 3,
            }
            request(app)
                .post('/products')
                .set('token', token)
                .send(newProduct)
                .then((response) => {
                    const { body, status } = response
                    expect(status).toBe(201)
                    expect(body).toHaveProperty('id', expect.any(Number))
                    expect(body).toHaveProperty('name', newProduct.name)
                    expect(body).toHaveProperty('image_url', newProduct.image_url)
                    expect(body).toHaveProperty('price', newProduct.price)
                    expect(body).toHaveProperty('stock', newProduct.stock)
                    expect(body).toHaveProperty('UserId', expect.any(Number))
                    id = body.id
                    done()
                })
        })
    })

    describe('Failed to create new product', () => {
        describe('attributes are empty', () => {
            it('Return status code 400 with err', (done) => {
                let message = "Name can't be empty,Name min 3 characters,Invalid url format,Price can't be empty,Stock can't be empty"
                let newProduct = {
                    name: '',
                    image_url: '',
                    price: '',
                    stock: '',
                }
                request(app)
                    .post('/products')
                    .set('token', token)
                    .send(newProduct)
                    .then((response) => {
                        const { body, status } = response
                        expect(status).toBe(400)
                        expect(body).toHaveProperty('message', message)
                        done()
                    })
            })
        })
        describe('attribute name has less than 3 characters', () => {
            it('Return status code 400 with err', (done) => {
                let newProduct = {
                    name: 'As',
                    image_url: 'http://your-image-url-2.com/img.png',
                    price: 4000000,
                    stock: 4,
                }
                request(app)
                    .post('/products')
                    .set('token', token)
                    .send(newProduct)
                    .then((response) => {
                        const { body, status } = response
                        expect(status).toBe(400)
                        expect(body).toHaveProperty('message', 'Name min 3 characters')
                        done()
                    })
            })
        })
        describe('attribute image_url has invalid url format', () => {
            it('Return status code 400 with err', (done) => {
                let newProduct = {
                    name: 'Asus',
                    image_url: 'http/your-image-url-2/img.png',
                    price: 4000000,
                    stock: 4,
                }
                request(app)
                    .post('/products')
                    .set('token', token)
                    .send(newProduct)
                    .then((response) => {
                        const { body, status } = response
                        expect(status).toBe(400)
                        expect(body).toHaveProperty('message', 'Invalid url format')
                        done()
                    })
            })
        })
        describe('attribute price has value below zero', () => {
            it('Return status code 400 with err', (done) => {
                let newProduct = {
                    name: 'Asus',
                    image_url: 'http://your-image-url-2.com/img.png',
                    price: -4000000,
                    stock: 4,
                }
                request(app)
                    .post('/products')
                    .set('token', token)
                    .send(newProduct)
                    .then((response) => {
                        const { body, status } = response
                        expect(status).toBe(400)
                        expect(body).toHaveProperty('message', "Price can't be below zero")
                        done()
                    })
            })
        })
        describe('attribute stock has value below zero', () => {
            it('Return status code 400 with err', (done) => {
                let newProduct = {
                    name: 'Asus',
                    image_url: 'http://your-image-url-2.com/img.png',
                    price: 4000000,
                    stock: -4,
                }
                request(app)
                    .post('/products')
                    .set('token', token)
                    .send(newProduct)
                    .then((response) => {
                        const { body, status } = response
                        expect(status).toBe(400)
                        expect(body).toHaveProperty('message', "Stock can't be below zero")
                        done()
                    })
            })
        })
    })
})
// FAILED <<<<<<<<<<
describe('Find all product', () => {
    describe('Success find all product', () => {
        it('Return status code 200 with data', (done) => {
            request(app)
                .get(`/products`)
                .set('token', token)
                .then((response) => {
                    const { body, status } = response
                    expect(status).toBe(200)
                    expect(body).toEqual(expect.any(Array))
                    done()
                })
        })
    })
})

describe('Find product by id', () => {
    describe('Success find product', () => {
        it('Return status code 200 with data', (done) => {
            request(app)
                .get(`/products/${id}`)
                .set('token', token)
                .then((response) => {
                    const { body, status } = response
                    expect(status).toBe(200)
                    expect(body).toHaveProperty('id', expect.any(Number))
                    expect(body).toHaveProperty('name', expect.any(String))
                    expect(body).toHaveProperty('image_url', expect.any(String))
                    expect(body).toHaveProperty('price', expect.any(Number))
                    expect(body).toHaveProperty('stock', expect.any(Number))
                    expect(body).toHaveProperty('UserId', expect.any(Number))
                    done()
                })
        })
    })
    describe('Fail to find product', () => {
        describe('product id is not in the database', () => {
            it('Return status code 404 with message', (done) => {
                request(app)
                    .get(`/products/77`)
                    .set('token', token)
                    .then((response) => {
                        const { body, status } = response
                        expect(status).toBe(404)
                        expect(body).toHaveProperty('message', "Product not found")
                        done()
                    })
            })
        })
    })
})

describe('Update product', () => {
    describe('Success update product', () => {
        it('Return status code 200 with message', (done) => {
            let updatedProduct = {
                name: 'Asus 1234',
                image_url: 'http://your-image-url.com/img.png',
                price: 4000000,
                stock: 2,
            }
            request(app)
                .put(`/products/${id}`)
                .set('token', token)
                .send(updatedProduct)
                .then((response) => {
                    const { body, status } = response
                    expect(status).toBe(200)
                    expect(body).toHaveProperty('name', updatedProduct.name)
                    expect(body).toHaveProperty('image_url', updatedProduct.image_url)
                    expect(body).toHaveProperty('price', updatedProduct.price)
                    expect(body).toHaveProperty('stock', updatedProduct.stock)
                    done()
                })
        })
    })
    describe('fail update product', () => {
        describe('attribute name has less than 3 characters', () => {
            it('Return status code 400 with err', (done) => {
                let newProduct = {
                    name: 'As',
                    image_url: 'http://your-image-url-2.com/img.png',
                    price: 4000000,
                    stock: 4,
                }
                request(app)
                    .post('/products')
                    .set('token', token)
                    .send(newProduct)
                    .then((response) => {
                        const { body, status } = response
                        expect(status).toBe(400)
                        expect(body).toHaveProperty('message', 'Name min 3 characters')
                        done()
                    })
            })
        })
        describe('attribute image_url has invalid url format', () => {
            it('Return status code 400 with err', (done) => {
                let newProduct = {
                    name: 'Asus',
                    image_url: 'http/your-image-url-2/img.png',
                    price: 4000000,
                    stock: 4,
                }
                request(app)
                    .post('/products')
                    .set('token', token)
                    .send(newProduct)
                    .then((response) => {
                        const { body, status } = response
                        expect(status).toBe(400)
                        expect(body).toHaveProperty('message', 'Invalid url format')
                        done()
                    })
            })
        })
        describe('attribute price has value below zero', () => {
            it('Return status code 400 with err', (done) => {
                let newProduct = {
                    name: 'Asus',
                    image_url: 'http://your-image-url-2.com/img.png',
                    price: -4000000,
                    stock: 4,
                }
                request(app)
                    .post('/products')
                    .set('token', token)
                    .send(newProduct)
                    .then((response) => {
                        const { body, status } = response
                        expect(status).toBe(400)
                        expect(body).toHaveProperty('message', "Price can't be below zero")
                        done()
                    })
            })
        })
        describe('attribute stock has value below zero', () => {
            it('Return status code 400 with err', (done) => {
                let newProduct = {
                    name: 'Asus',
                    image_url: 'http://your-image-url-2.com/img.png',
                    price: 4000000,
                    stock: -4,
                }
                request(app)
                    .post('/products')
                    .set('token', token)
                    .send(newProduct)
                    .then((response) => {
                        const { body, status } = response
                        expect(status).toBe(400)
                        expect(body).toHaveProperty('message', "Stock can't be below zero")
                        done()
                    })
            })
        })
        describe('product id is not in the database', () => {
            it('Return status code 404 with message', (done) => {
                let newProduct = {
                    name: 'Asus',
                    image_url: 'http://your-image-url-2.com/img.png',
                    price: 4000000,
                    stock: -4,
                }
                request(app)
                    .get(`/products/777`)
                    .set('token', token)
                    .send(newProduct)
                    .then((response) => {
                        const { body, status } = response
                        expect(status).toBe(404)
                        expect(body).toHaveProperty('message', "Product not found")
                        done()
                    })
            })
        })
    })
})

describe('Delete product', () => {
    describe('Success delete product', () => {
        it('Return status code 200 with message', (done) => {
            request(app)
                .delete(`/products/1`)
                .set('token', token)
                .then((response) => {
                    const { body, status } = response
                    expect(status).toBe(200)
                    expect(body).toHaveProperty('message', "Product successfully deleted")
                    done()
                })
        })
    })
})
