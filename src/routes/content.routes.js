const express = require('express');
const { bodyValidation, tokenBasedValidation } = require('../middlewares');
const { createContentType } = require('../controllers/content.controller');
const router = express.Router();

const { reqProperties, bodyValidator } = bodyValidation;
const { createContentTypeSchema } = require('../schemas/content.schema');

router.get('/', (req, res) => {
    res.send('Content test route');
});

router.post('/create', bodyValidator(createContentTypeSchema, reqProperties.body), createContentType);
// router.patch('/update')
// router.delete('/field')
// router.get('/field/:id')

module.exports = router;