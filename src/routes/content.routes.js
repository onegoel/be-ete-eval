const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Content test route');
});

// router.post('/create',)

module.exports = router;