const { errorHandler } = require('../utils/errorHandler.utils');
const {
    getAllContentTypesFromDb,
    createContentTypeInDb, 
    renameContentTypeInDb, 
    addFieldToContentTypeInDb, 
    deleteFieldFromContentTypeInDb,
    renameFieldInContentTypeInDb,
    getFieldsOfContentTypeByIdFromDb
} = require('../services/content.service');

module.exports = {
    getAllContentTypes: async (req, res) => {
        try {
            const contentTypes = await getAllContentTypesFromDb();
            res.status(200).json({
                data: {
                    statusCode: 200,
                    message: 'Content types found',
                    contentTypes
                }
            });
        } catch (error) {
            errorHandler(error, res);
        }
    },

    createContentType: async (req, res) => {
        try {
            const { name, fields } = req.body;
            console.log(name, fields);
            await createContentTypeInDb(name, fields);
            res.status(201).json({
                data: {
                    statusCode: 201,
                    message: 'Content type created successfully',
                }
            });
        } catch (error) {
            errorHandler(error, res);
        }
    },

    renameContentTypeById: async (req, res) => {
        try {
            const { id } = req.params;
            const { name } = req.body;
            await renameContentTypeInDb(id, name);
            res.status(201).json({
                data: {
                    statusCode: 201,
                    message: 'Content type name updated successfully',
                }
            });
        } catch (error) {
            errorHandler(error, res);
        }
    },

    addFieldToContentType: async (req, res) => {
        try {
            const { id } = req.params;
            const { name } = req.body;
            await addFieldToContentTypeInDb(id, name);
            res.status(201).json({
                data: {
                    statusCode: 201,
                    message: 'Field added to content type successfully',
                }
            });
        }
        catch (error) {
            errorHandler(error, res);
        }
    },

    deleteFieldFromContentType: async (req, res) => {
        try {
            console.log('hello');
            const { id, fieldId } = req.params;
            await deleteFieldFromContentTypeInDb(id, fieldId);
            res.status(201).json({
                data: {
                    statusCode: 201,
                    message: 'Field deleted from content type successfully',
                }
            });
        }
        catch (error) {
            errorHandler(error, res);
        }
    },

    renameFieldInContentType: async (req, res) => {
        try {
            const { id, fieldId } = req.params;
            const { name } = req.body;
            await renameFieldInContentTypeInDb(id, fieldId, name);
            res.status(201).json({
                data: {
                    statusCode: 201,
                    message: 'Field name updated successfully',
                }
            });
        }
        catch (error) {
            errorHandler(error, res);
        }
    },

    getFieldsOfContentTypeById: async (req, res) => {
        try {
            const { id } = req.params;
            const fields = await getFieldsOfContentTypeByIdFromDb(id);
            res.status(200).json({
                data: {
                    statusCode: 200,
                    message: 'Fields found',
                    fields
                }
            });
        } catch (error) {
            errorHandler(error, res);
        }
    }

};

