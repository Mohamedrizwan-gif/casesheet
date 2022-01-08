const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../model/users');

module.exports = async(req, res, next) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const user = await User.findOne({ email: email });
        if (!user) {
            const error = new Error('No user found');
            error.statusCode = 404;
            throw error;
        }
        const token = await jwt.sign({ id: user._id, email: email }, 'secret_key', { expiresIn: '3h' });
        const verifyPassword = await bcrypt.compare(password, user.password);
        if (!verifyPassword) {
            res.status(403).json({
                messsage: 'Password is incorrect'
            })
        }
        if (verifyPassword) {
            res.status(200).json({
                message: 'email verified',
                id: user._id,
                token: token
            });
        }
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};