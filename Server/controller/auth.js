const crypto = require('crypto');
const nodemailer = require('nodemailer');
const sendGridTransport = require('nodemailer-sendgrid-transport');
const bcrypt = require('bcryptjs');

const transport = nodemailer.createTransport(sendGridTransport({
    auth: {
        api_key: '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'
    }
}));

const User = require('../model/users');

exports.forgotPassword = async(req, res, next) => {
    try {
        const email = req.body.email;
        const crypt = crypto.randomBytes(12);
        const token = crypt.toString('hex');
        const user = await User.findOne({ email: email });
        if (!user) {
            const error = new Error('No user found');
            error.statusCode = 404;
            throw error;
        }
        if (user) {
            user.refreshToken = token;
            user.refreshTokenExpiration = Date.now() + 3600000;
            const updatedUser = await user.save();
            if (updatedUser) {
                res.status(200).json({
                    message: 'Please check your mail'
                });
            }
        }
        transport.sendMail({
            from: 'programmingwarriors@gmail.com',
            to: email,
            subject: 'Reset Password',
            html: `
            <!DOCTYPE html>
            <html>
            <head>
            <style>
                .overlay {    
                    position: relative;
                    padding: 10px;
                    width: 95%;
                    background: floralwhite;
                    box-shadow: 1px 2px 4px #d7d7d7, -1px -2px 4px #d7d7d7;
                    border-radius: 10px;
                }
            </style>
            </head>
            <body style="font: menu;font-size: 14px;>
                <h2 style="text-align: center;">Password Reset:</h2>
                <div class="overlay">
                    <p>Seems like you forgot your password for casesheet. If this is true click below to reset your password</p>
                    <br/>
                    <button style="position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);background: #5151f8;padding: 10px;border-radius: 5px;border: none;">
                        <a style="color:white;text-decoration:none;" href="http://localhost:3000/resetpassword/${token}">Reset My Password</a>
                    </button>
                    <p>If you did not forgot your password you can safely ignore this email</p>
                </div>
            </body>
            </html>
            `
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.resetPassword = async(req, res, next) => {
    const token = req.params.token;
    const password = req.body.password;
    try {
        const user = await User.findOne({ refreshToken: token, refreshTokenExpiration: { $gt: Date.now() } });
        if (!user) {
            const error = new Error('Invalid token or time expired');
            error.statusCode = 422;
            throw error;
        }
        const hashPassword = await bcrypt.hash(password, 10);
        user.password = hashPassword;
        const updatedUser = await user.save();
        console.log(updatedUser);
        if (updatedUser) {
            res.status(200).json({
                message: 'Password is changed'
            });
        }
    } catch (err) {
        console.log(err);
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};