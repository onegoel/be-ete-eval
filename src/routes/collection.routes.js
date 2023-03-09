const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Collection test route');
});

module.exports = router;