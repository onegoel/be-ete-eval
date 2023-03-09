const express = require('express');
// const { tokenBasedValidation } = require('../middlewares/validator.middleware');
const router = express.Router();
const { createContentType } = require('../controllers/content.controller');

router.get('/', (req, res) => {
    res.send('Content test route');
});

router.post('/create', createContentType);


module.exports = router;