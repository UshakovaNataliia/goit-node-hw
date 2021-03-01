const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)
exports.createContactSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    subscription: Joi.string().required(),
    password: Joi.string().required()
})
exports.patchContactSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    phone: Joi.string(),
    subscription: Joi.string(),
    password: Joi.string()
}).min(1)
exports.vildateId = Joi.object({
    id: Joi.objectId()
})