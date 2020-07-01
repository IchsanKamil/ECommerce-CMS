module.exports = (err, req, res, next) => {
    let code = '';
    let message = '';

    switch (err.name) {
        case 'SequelizeValidationError':
            let errors = [];
            err.errors.forEach(el => {
                errors.push(el.message);
            });

            code = 400
            message = `${errors}`
            break;

        case 'EMAIL/PASSWORD_NOT_MATCH':
            code = 400
            message = `Email/Password not match`
            break;

        case 'EMAIL_NOT_FOUND':
            code = 404
            message = `Email not found`
            break;

        case 'SequelizeUniqueConstraintError':
            code = 401
            message = `Email already exist`
            break;

        case 'INVALID_USER':
            code = 401
            message = `Invalid user`
            break;

        case 'NOT_AUTHORIZED':
            code = 403
            message = `You are not authorized to do this`
            break;

        case 'PRODUCT_NOT_FOUND':
            code = 404
            message = `Product not found`
            break;

        case 'TOKEN_NOT_FOUND':
            code = 404
            message = `Token not found`
            break;

        default:
            code = 500
            message = `Internal server error`
            break;
    }

    res.status(code).json({ message })
}