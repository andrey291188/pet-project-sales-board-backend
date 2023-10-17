const Joi = require("joi"); 

const userValidationSchema = Joi.object({
    name: Joi.string().min(2).required(),
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    password: Joi.string().min(6).max(30).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    phone: Joi.number().min(10).required()
})

module.exports = userValidationSchema;