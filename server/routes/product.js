const router = require('express').Router();
const ProductController = require('../controllers/ProductController.js');
const { authentication } = require('../middlewares/authentication.js');

router.get('/', ProductController.findAll);
router.get('/:id', ProductController.findOne)

router.use(authentication);
router.post('/', ProductController.create);
router.put('/:id', ProductController.update);
router.delete('/:id', ProductController.destroy);

module.exports = router;