const { ContentType, Field } = require('../models');

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
    }
};