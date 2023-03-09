const { errorHandler } = require('../utils/errorHandler.utils');
const { createContentTypeInDb, 
    updateContentTypeNameInDb, 
    addFieldToContentTypeInDb, 
    deleteFieldFromContentTypeInDb } 
    = require('../services/content.service');

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
    },

    updateContentTypeNameById: async (req, res) => {
        try {
            const { id } = req.params;
            const { name } = req.body;
            await updateContentTypeNameInDb(id, name);
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
    }

};

