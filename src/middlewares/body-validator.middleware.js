const reqProperties = {
    body: 'body',
    params: 'params',
    query: 'query',
    header: 'headers'
};

module.exports = {
    bodyValidator: (schema, reqProperty) => {
        return (req, res, next) => {
            const { error: joiError } = schema.validate(req[reqProperties[reqProperty]]);
            if (joiError) {
                return res.status(422).json({ message: joiError.details[0].message });
            }
            next();
        };
    },
    reqProperties,
};