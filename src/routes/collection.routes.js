const express = require('express');
const router = express.Router();
const { createCollection } = require('../controllers/collection.controller');

router.get('/', (req, res) => {
    res.send('Collection test route');
});

router.post('/create', createCollection);

module.exports = router;