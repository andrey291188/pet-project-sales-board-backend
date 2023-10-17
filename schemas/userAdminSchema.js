const Joi = require("joi");

const userAdminSchema = Joi.object({
    passwordAdmin: Joi.string().required(),
    adminAccess: Joi.boolean().required(),
})

module.exports = userAdminSchema