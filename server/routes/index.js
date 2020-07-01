const router = require('express').Router();
const productRouter = require('./product.js');
const userRouter = require('./user.js');
const customerRouter = require('./customer.js');

router.use('/', userRouter);
router.use('/products', productRouter);
router.use('/customers', customerRouter);

module.exports = router;