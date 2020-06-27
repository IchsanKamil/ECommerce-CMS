const router = require('express').Router();
const productRouter = require('./product.js');
const userRouter = require('./user.js');

router.use('/', userRouter);
router.use('/products', productRouter);

module.exports = router;