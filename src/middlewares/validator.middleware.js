const jwt = require('jsonwebtoken');

module.exports = {
    tokenBasedValidation: () => {
        return (req, res, next) => {
        // const authHeader = req.headers['authorization'];
        // const token = authHeader && authHeader.split(' ')[1];
        // if (token) {
        //     jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        //         if (err) {
        //             res.status(401).json({ message: 'Invalid token' });
        //         } else {
        //             req.decoded = decoded;
        //             next();
        //         }
        //     });
        // } else {
        //     res.status(401).json({ message: 'No token provided' });
        // }
        };
    }
};