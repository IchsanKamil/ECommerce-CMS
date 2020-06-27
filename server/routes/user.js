const router= require('express').Router();
const UserController = require('../controllers/UserController.js');

router.post('/login', UserController.login);

module.exports = router;