const Joi = require("joi"); 

const loginUserSchema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    password: Joi.string().min(6).required(),
})

module.exports = loginUserSchema ;