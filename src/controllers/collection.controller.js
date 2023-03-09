const { createCollectionInDb } = require('../services/collection.service');
const { errorHandler } = require('../utils/errorHandler.utils');

const createCollection = async (req, res) => {
    try {
        const { contentType, data } = req.body;

        await createCollectionInDb(contentType, data);

        res.status(201).json({
            data: {
                statusCode: 201,
                message: 'Entity created successfully',
            }
        });
    }
    catch (error) {
        errorHandler(error, res);
    }
};

module.exports = {
    createCollection,
};

