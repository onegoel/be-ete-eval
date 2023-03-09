const { createCollectionInDb, getCollectionByIdFromDb } = require('../services/collection.service');
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

const getCollectionById = async (req, res) => {
    try {
        const { id } = req.params;
        const collection = await getCollectionByIdFromDb(id);

        res.status(200).json({
            data: {
                statusCode: 200,
                message: 'Collection found',
                collection
            }
        });
    } catch (err) {
        errorHandler(err, res);
    }
};




module.exports = {
    createCollection,
    getCollectionById,
};
    
  