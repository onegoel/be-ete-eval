const express = require('express');
const { bodyValidation } = require('../middlewares');
const { tokenBasedValidation } = require('../middlewares/token-validator.middleware');
const {
    getAllContentTypes, createContentType, renameContentTypeById, addFieldToContentType, deleteFieldFromContentType, renameFieldInContentType, getFieldsOfContentTypeById 
} = require('../controllers/content.controller');
const router = express.Router();

const { reqProperties, bodyValidator } = bodyValidation;
const { createContentTypeSchema } = require('../schemas/content.schema');


router.get('/', getAllContentTypes);
router.get('/:id');
router.delete('/:id'); // delete a content type
router.post('/create', bodyValidator(createContentTypeSchema, reqProperties.body), createContentType);
router.patch('/update/:id', renameContentTypeById);
router.patch('/:id/field/:fieldId', renameFieldInContentType); 
router.delete('/:id/field/:fieldId', deleteFieldFromContentType); 
router.post('/:id/field', addFieldToContentType); ////
router.get('/:id/field', getFieldsOfContentTypeById);

module.exports = router;