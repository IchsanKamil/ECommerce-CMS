const { User } = require('../models');
const { compare } = require('../helpers/bcrypt.js');
const { generateToken } = require('../helpers/jwt.js');

class UserController {
    static login(req, res, next) {
        const { email, password } = req.body;
        User.findOne({
            where: { email }
        })
            .then((data) => {
                if (data) {
                    if (compare(password, data.password)) {
                        let payload = {
                            id: data.id,
                            email
                        }
                        const token = generateToken(payload);

                        res.status(200).json({
                            id: data.id,
                            email,
                            token
                        });
                    } else throw({ name: `EMAIL/PASSWORD_NOT_MATCH` })
                } else throw({ name: `EMAIL_NOT_FOUND` })
            }).catch((err) => {
                next(err);
            });
    }
}

module.exports = UserController;