const { Collection, ContentType, Field, Entity } = require('../models');
const createHttpError = require('http-errors');

const createCollectionInDb = async (contentType, data) => {
    const targetContentType = await ContentType.findOne({
        where: {
            name: contentType,
        }
    });
    if (!targetContentType) {
        throw createHttpError(404, 'Content type not found');
    }
    const targetContentTypeId = targetContentType.id;

    const targetCollection = await Collection.findOne({
        where: {
            contentTypeId: targetContentTypeId,
        }
    });
    if (!targetCollection) {
        throw createHttpError(404, 'Collection not found');
    }
    const targetCollectionId = targetCollection.id;

    const validFields = await Field.findAll({
        where: {
            contentTypeId: targetContentTypeId,
        }
    });

    const validFieldsIds = validFields.map((field) => field.id);
    if(!data.every((item) => validFieldsIds.includes(item.id))) {
        throw createHttpError(400, 'Invalid field id');
    }

    await Entity.bulkCreate(data.map((item) => {
        return {
            collectionId: targetCollectionId,
            fieldId: item.id,
            value: item.value,
        };
    }));
};

const getCollectionByIdFromDb = async (id) => {
    const collection = await Collection.findByPk(id, { attributes: [
        'id', 'name', 'contentTypeId'
    ] });

    console.log(collection.dataValues);

    const entities = await Entity.findAll({
        where: {
            collectionId: id
        },
        attributes: ['fieldId', 'value']
    });

    const fields = await Field.findAll({
        where: {
            contentTypeId: collection.dataValues.contentTypeId
        },
        attributes: ['id', 'name']
    });


    const entitiesWithFields = entities.map(entity => {
        const field = fields.find(field => field.dataValues.id === entity.dataValues.fieldId);
        return {
            field: field.dataValues.name,
            ...entity.dataValues
        };
    });

    const collectionWithEntities = {
        ...collection.dataValues,
        entities: entitiesWithFields
    };

    return collectionWithEntities;
};

module.exports = {
    createCollectionInDb,
    getCollectionByIdFromDb,
};