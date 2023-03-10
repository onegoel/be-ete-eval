const {
    Collection, ContentType, Field, Entity 
} = require('../models');
const createHttpError = require('http-errors');


module.exports = {
    getAllCollectionsFromDb: async () => {
        const collections = await Collection.findAll({
            attributes: [
                'id', 'name', 'contentTypeId'
            ],
            groupBy: ['contentTypeId'],
        });
        if(collections === null || collections === undefined) {
            throw createHttpError(404, 'Collections not found');
        }
        return collections;


    },

    createCollectionInDb: async (id, data) => {
        const targetContentType = await ContentType.findOne({
            where: {
                id,
            }
        });
        if (targetContentType === null || targetContentType === undefined) {
            throw createHttpError(404, 'Content type not found');
        }

        await Collection.create({
            name: targetContentType.name,
            contentTypeId: id,
        });

        // id of the newly created collection
        const collectionId = (await Collection.findOne({
            where: {
                contentTypeId: id
            },
            order: [['createdAt', 'DESC']]
        })).id;

    
        const validFields = await Field.findAll({
            where: {
                contentTypeId: id
            }
        });

        const validFieldsIds = validFields.map((field) => field.id);
        if(!data.every((item) => validFieldsIds.includes(item.id))) {
            throw createHttpError(400, 'Invalid field id');
        }

        await Entity.bulkCreate(data.map((item) => {
            return {
                collectionId,
                fieldId: item.id,
                value: item.value,
            };
        }));
    },

    getCollectionByIdFromDb: async (id) => {
        const collection = await Collection.findByPk(id, {
            attributes: [
                'id', 'name', 'contentTypeId'
            ] 
        });

        if(collection === null || collection === undefined) {
            throw createHttpError(404, 'Collection not found');
        }

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
    },

    getCollectionByContentTypeIdFromDb: async (id) => {

        const collections = await Collection.findAll({
            where: {
                contentTypeId: id
            },
            attributes: [
                'id', 'name', 'contentTypeId'
            ]
        });

        // console.log(collections);

        if(collections === null || collections === undefined) {
            throw createHttpError(404, 'Collection not found');
        }

        const entities = await Entity.findAll({
            where: {
                collectionId: collections.map(collection => collection.dataValues.id)
            },
            attributes: [
                'fieldId', 'value', 'collectionId'
            ]
        });
        // console.log(entities);
        
        const fields = await Field.findAll({
            where: {
                contentTypeId: id
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

        console.log(entitiesWithFields);

        const collectionsWithEntities = collections.map(collection => {
            return {
                ...collection.dataValues,
                entities: entitiesWithFields.filter(entity => entity.collectionId === collection.dataValues.id)
            };
        });

        return collectionsWithEntities;
    },

    deleteCollectionByIdInDb: async (id) => {
        const collection = await Collection.findByPk(id);
        if (!collection) {
            throw createHttpError(404, 'Collection not found');
        }
        await collection.destroy();
        await Entity.destroy({
            where: {
                collectionId: id
            }
        });
    },

    renameCollectionByIdInDb: async (id, name) => {
        const collection = await Collection.findByPk(id);
        if (!collection) {
            throw createHttpError(404, 'Collection not found');
        }
        collection.name = name;
        await collection.save();
    },

    updateFieldValueInCollectionInDb: async (id, fieldId, value) => {
        const collection = await Collection.findByPk(id);
        if (!collection) {
            throw createHttpError(404, 'Collection not found');
        }
        const field = await Field.findByPk(fieldId);
        if (!field) {
            throw createHttpError(404, 'Field not found');
        }
        const entity = await Entity.findOne({
            where: {
                collectionId: id,
                fieldId
            }
        });
        if (!entity) {
            throw createHttpError(404, 'Entity not found');
        }
        entity.value = value;
        await entity.save();
    }

};
