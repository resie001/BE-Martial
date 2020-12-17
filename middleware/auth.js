const jwt = require('jsonwebtoken');

module.exports = {
    isAuth: (req, res, next) => {
        try {
            let token = req.headers['x-access-token'] || req.headers['authorization']
            if (token.startsWith('Bearer ')) {
                // Remove Bearer from string
                token = token.slice(7, token.length);
            }
            if (token) {
                var decoded = jwt.verify(token, "UK1SbazgQ3yynO3Mg2bgaONSuD5rM0CqIccoUhWqk3NgUqDqQ3GBYCWxZkKsV36z");
                req.account = decoded;
                next();
            } else {
                res.status(403).json({
                    status: 403,
                    message: 'Token is Invalid'
                });
            }
        } catch (err) {
            res.status(401).json({
                status: 401,
                message: 'Token is Invalid'
            });
        }
    }
}