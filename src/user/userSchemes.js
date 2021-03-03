const Joi = require('joi')
exports.createUserSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
})
exports.loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
})