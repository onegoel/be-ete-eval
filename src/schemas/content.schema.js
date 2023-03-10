const Joi = require('joi');

module.exports = {
    createContentTypeSchema: Joi.object({
        name: Joi.string().required(),
        fields: Joi.array().items(Joi.string()),
    }),
};