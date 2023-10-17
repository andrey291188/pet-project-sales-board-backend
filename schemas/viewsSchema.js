const Joi = require("joi");

const viewsSchema = Joi.object({
    views: Joi.number().valid(0).required(),
})

module.exports = viewsSchema;