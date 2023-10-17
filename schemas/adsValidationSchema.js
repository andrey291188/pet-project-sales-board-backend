const Joi = require("joi");

const adsValidationSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.string().required(),
})

module.exports = adsValidationSchema