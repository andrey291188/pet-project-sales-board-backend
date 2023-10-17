const {isValidObjectId} = require("mongoose");

const {HttpError} = require("../helpers");

const isValidId = (rq, rs, next) => {
    const {adsId} = rq.params;
    if (!isValidObjectId(adsId)) {
        next(HttpError(400, `${adsId} is not valid id`))
    }
    next()
}

module.exports = isValidId