const axios = require('axios');

module.exports = {
    tokenBasedValidation: () => {
        return async (req, res, next) => {
            const token = req.headers.authorization;
            if (!token) {
                res.status(401).json({
                    data: {
                        message: 'Token not found'
                    }
                });
            }
            else {
                try {
                    const decoded = await axios({
                        method: 'post',
                        url: 'http://localhost:8100/auth/validate',
                        data: {
                            token,
                        },
                    });
                    req.user = decoded;
                    next();
                } catch (err) {
                    res.status(401).json({
                        data: {
                            message: 'Token is invalid'
                        }
                    });
                }
            }
        };
    }
};
