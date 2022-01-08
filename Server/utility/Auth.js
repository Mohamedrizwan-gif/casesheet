const jwt = require('jsonwebtoken');

module.exports = async(req, res, next) => {
    const token = req.get('Authorization').split(' ')[1];
    try {
        const decoded = jwt.verify(token, 'secret_key');
        req.userId = decoded.id;
        next();
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}