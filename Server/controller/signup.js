const bcrpyt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../model/users');

module.exports = async(req, res, next) => {
    try {
        const name = req.body.name;
        const phone_no = req.body.phone_no;
        const email = req.body.email;
        const password = req.body.password;
        const userExist = await User.findOne({ email: email });
        const hashPassword = await bcrpyt.hash(password, 10);
        if (userExist) {
            const error = new Error('user already exist');
            error.statusCode = 409;
            throw error;
        }
        const user = await User.create({
            name: name,
            phone_no: phone_no,
            email: email,
            password: hashPassword
        });
        const token = await jwt.sign({ id: user._id, email: email }, 'secret_key', { expiresIn: '3h' });
        if (user) {
            res.status(201).json({
                message: "user is registered",
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