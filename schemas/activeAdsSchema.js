const Joi = require("joi");

const activeAdsSchema = Joi.object({
    active: Joi.boolean().required(),
})

module.exports = activeAdsSchema;