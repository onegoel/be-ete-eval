const express = require('express');
const router = express.Router();
const {
    getAllCollections, createCollection, getCollectionById, deleteCollectionById, renameCollectionById, updateFieldValueInCollection, getCollectionByContentTypeId
} = require('../controllers/collection.controller');

router.get('/', getAllCollections);
router.post('/create/:id', createCollection); // create collection for a given content type
router.get('/:id', getCollectionById); // get collection for a given content type
router.get('/content-type/:id', getCollectionByContentTypeId); // get collection for a given content type
router.delete('/:id', deleteCollectionById); // delete collection for a given content type
router.patch('/name/:id', renameCollectionById); // update collection name
router.patch('/:id/field/:fieldId', updateFieldValueInCollection); // update field value


module.exports = router;