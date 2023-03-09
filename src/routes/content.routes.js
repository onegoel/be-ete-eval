const express = require('express');
const { bodyValidation, tokenBasedValidation } = require('../middlewares');
const { createContentType, updateContentTypeNameById, addFieldToContentType, deleteFieldFromContentType } = require('../controllers/content.controller');
const router = express.Router();

const { reqProperties, bodyValidator } = bodyValidation;
const { createContentTypeSchema } = require('../schemas/content.schema');

router.get('/', (req, res) => {
    res.send('Content test route');
});

router.get('/:id');
router.delete('/:id'); // delete a content type
router.post('/create', bodyValidator(createContentTypeSchema, reqProperties.body), createContentType);
router.patch('/update/:id', updateContentTypeNameById);
router.patch('/:id/field/:fieldId'); // rename a field in a content type
router.delete('/:id/field/:fieldId', deleteFieldFromContentType); // delete a field from a content type
router.post('/:id/field', addFieldToContentType); // add a new field to a content type




module.exports = router;