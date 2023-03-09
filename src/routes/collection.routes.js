const express = require('express');
const router = express.Router();
const { createCollection, getCollectionById } = require('../controllers/collection.controller');

router.get('/', (req, res) => {
    res.send('Collection test route');
});

router.post('/create', createCollection);
router.get('/:id', getCollectionById);


module.exports = router;