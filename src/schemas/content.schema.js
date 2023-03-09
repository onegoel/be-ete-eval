const Joi = require('joi');

module.exports = {
    createContentType: Joi.object({
        name: Joi.string().required(),
        fields: Joi.array().items(Joi.string()).required(),
    }),
};