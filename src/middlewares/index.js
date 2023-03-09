const bodyValidation = require('./body-validator.middleware');
const tokenBasedValidation = require('./token-validator.middleware');

module.exports = {
    bodyValidation,
    tokenBasedValidation
};
