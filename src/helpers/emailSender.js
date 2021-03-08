const sgMail = require('@sendgrid/mail')
const path = require('path');
const UserModel = require('../user/userModel');
const { NotFound } = require('./errors');
require('dotenv').config({ path: path.join(__dirname, "../../.env") });

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

exports.emailSender = async (email, verificationToken) => {
    try {
        const msg = {
            to: email,
            from: process.env.SENDGRID_SENDER,
            subject: "Hello Node.js",
            text: "Verification",
            html: `<p>Please verify your account, just follow this</p><a href="http://localhost:3000/auth/verify/${verificationToken}" target="_blank">link</a>`,
        };
        await sgMail.send(msg)
        console.log('Email send');
    } catch (error) {
        console.error(error);
    }
};

exports.checkVerification = async (req, res, next) => {
    try {
        const { verificationToken } = req.params;
        const verifiedUser = await UserModel.findOneAndUpdate({ verificationToken }, { $unset: { verificationToken } });
        if (!verifiedUser) {
            return res.status(404).send('User not found')
        }
        return res.status(200).send('Success')
    } catch (error) {
        next(error)
    }
}