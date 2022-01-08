const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const User = Schema({
    name: String,
    email: String,
    password: String,
    refreshToken: String,
    refreshTokenExpiration: Date
});

module.exports = mongoose.model('user', User);