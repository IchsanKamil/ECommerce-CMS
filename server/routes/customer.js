const router= require('express').Router();
const CustomerController = require('../controllers/CustomerController.js');
const { authenticationCust } = require('../middlewares/authentication.js');
const authorization = require('../middlewares/authorization.js');

router.post('/register', CustomerController.register);
router.post('/login', CustomerController.login);

router.use(authenticationCust);
router.post('/:CustomerId', authorization, CustomerController.create);
router.get('/:CustomerId', authorization, CustomerController.readAll);
router.put('/:CustomerId/:ProductId', authorization, authorization, CustomerController.update);
router.delete('/:CustomerId/:ProductId', authorization, authorization, CustomerController.destroy);
// router.get('/checkout', authorization, CustomerController.checkout);

module.exports = router;