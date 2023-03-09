const {
    ContentType, Field, Collection 
} = require('../models');
const createHttpError = require('http-errors');

module.exports = {
    createContentTypeInDb: async (name, fields) => {
        const newContentType = await ContentType.create({
            name,
        });
        const newFields = fields.map((field) => {
            return {
                name: field,
                contentTypeId: newContentType.id,
                dataType: 'string',
            };
        });
        await Field.bulkCreate(newFields);
        
        await Collection.create({
            name,
            contentTypeId: newContentType.id,
        });   
    },

    updateContentTypeNameInDb: async (id, name) => {
        await ContentType.update({
            name,
        }, {
            where: {
                id,
            }
        });
    },

    addFieldToContentTypeInDb: async (id, name) => {
        const contentType = await ContentType.findByPk(id);
        if (!contentType) {
            throw createHttpError(404, 'Content type not found');
        }
        const field = await Field.findOne({
            where: {
                name,
                contentTypeId: id,
            }
        });
        if (field) {
            throw createHttpError(400, 'Field already exists');
        }
        await Field.create({
            name,
            contentTypeId: id,
            dataType: 'string',
        });
    },

    deleteFieldFromContentTypeInDb: async (id, fieldId) => {
        const contentType = await ContentType.findByPk(id);
        if (!contentType) {
            throw createHttpError(404, 'Content type not found');
        }
        const field = await Field.findByPk(fieldId);
        if (!field) {
            throw createHttpError(404, 'Field not found');
        }
        await field.destroy();
    },

    renameFieldInContentTypeInDb: async (id, fieldId, name) => {
        const contentType = await ContentType.findByPk(id);
        if (!contentType) {
            throw createHttpError(404, 'Content type not found');
        }
        const field = await Field.findByPk(fieldId);
        if (!field) {
            throw createHttpError(404, 'Field not found');
        }
        await field.update({
            name,
        });
    }
};