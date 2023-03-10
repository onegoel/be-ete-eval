const {
    getAllCollectionsFromDb, createCollectionInDb, getCollectionByIdFromDb, deleteCollectionByIdInDb, renameCollectionByIdInDb, updateFieldValueInCollectionInDb, getCollectionByContentTypeIdFromDb
} = require('../services/collection.service');
const { errorHandler } = require('../utils/errorHandler.utils');

module.exports = {
    getAllCollections: async (req, res) => {
        try {
            const collections = await getAllCollectionsFromDb();
            res.status(200).json({
                data: {
                    statusCode: 200,
                    message: 'Collections found',
                    collections
                }
            });
        } catch (err) {
            errorHandler(err, res);
        }
    },

    createCollection: async (req, res) => {
        try {
            const { id } = req.params; //content type id
            const { data } = req.body;

            await createCollectionInDb(id, data);

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
    },

    getCollectionById: async (req, res) => {
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
    },

    getCollectionByContentTypeId: async (req, res) => {
        try {
            const { id } = req.params;
            const collection = await getCollectionByContentTypeIdFromDb(id);
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
    },

    deleteCollectionById: async (req, res) => {
        try {
            const { id } = req.params;

            await deleteCollectionByIdInDb(id);

            res.status(200).json({
                data: {
                    statusCode: 200,
                    message: 'Collection deleted successfully'
                }
            });
        } catch (err) {
            errorHandler(err, res);
        }
    },

    renameCollectionById: async (req, res) => {
        try {
            const { id } = req.params;
            const { name } = req.body;

            await renameCollectionByIdInDb(id, name);

            res.status(200).json({
                data: {
                    statusCode: 200,
                    message: 'Collection renamed successfully'
                }
            });
        } catch (err) {
            errorHandler(err, res);
        }
    },

    updateFieldValueInCollection: async (req, res) => {
        try {
            const { id, fieldId } = req.params;
            const { value } = req.body;

            await updateFieldValueInCollectionInDb(id, fieldId, value);

            res.status(200).json({
                data: {
                    statusCode: 200,
                    message: 'Field value updated successfully'
                }
            });
        } catch (err) {
            errorHandler(err, res);
        }
    }
};

  