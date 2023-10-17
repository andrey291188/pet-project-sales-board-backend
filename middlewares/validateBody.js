const {HttpError} = require("../helpers")

const validateBody = schema => {
    const func = (rq, rs, next) => {
        const { error } = schema.validate(rq.body);
        if (error) {
            next(HttpError(400, error.message))
        }
        next()
    }
    return func
}

module.exports = validateBody