const {
    ContentType, Field, Entity 
} = require('../models');
const createHttpError = require('http-errors');

module.exports = {

    getAllContentTypesFromDb: async () => {
        const contentTypes = await ContentType.findAll({
            include: [
                {
                    model: Field,
                    as: 'fields',
                    attributes: ['id', 'name',],
                }
            ],
            attributes: ['id', 'name'],
        });
        if(contentTypes === null || contentTypes === undefined)
            throw createHttpError(404, 'Content types not found'); 
        
        
        return contentTypes;
    },

    createContentTypeInDb: async (name, fields = null) => {
        const contentType = await ContentType.findOne({
            where: {
                name,
            }
        });
        if (contentType !== null) {
            throw createHttpError(400, 'Content type already exists');
        }
        const newContentType = await ContentType.create({
            name,
        });
        if (fields !== null) {
            const newFields = fields.map((field) => {
                return {
                    name: field,
                    contentTypeId: newContentType.id,
                    dataType: 'string',
                };
            });
            await Field.bulkCreate(newFields);   
        }
    },

    renameContentTypeInDb: async (id, name) => {
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
        await Entity.destroy({
            where: {
                fieldId,
            }
        });
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
    },

    getFieldsOfContentTypeByIdFromDb: async (id) => {
        const contentType = await ContentType.findByPk(id);
        
        if (!contentType) {
            throw createHttpError(404, 'Content type not found');
        }
        const fields = await Field.findAll({
            where: {
                contentTypeId: id,
            },
            attributes: ['id', 'name'],
        });
        return fields;
    },

};