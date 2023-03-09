const { errorHandler } = require('../utils/errorHandler.utils');
const { createContentTypeInDb } = require('../services/content.service');

module.exports = {
    createContentType: async (req, res) => {
        try {
            const { name, fields } = req.body;
            console.log(name, fields);
            await createContentTypeInDb(name, fields);
            res.status(201).json({
                data: {
                    statusCode: 201,
                    message: 'Content type & empty collection created successfully',
                }
            });
        } catch (error) {
            errorHandler(error, res);
        }
    }
};

