const Joi = require("joi"); 

const emailVerifySchema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
})

module.exports = emailVerifySchema;