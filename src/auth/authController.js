const { Conflict, Unauthorized, NotFound } = require("../helpers/errors")
const UserModel = require("../user/userModel")
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
exports.register = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const existingUser = await UserModel.findOne({ email })
        if (existingUser) {
            throw new Conflict('user with such email already exist')
        }
        const hashPassword = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS))
        const newUser = await UserModel.create({ email, password: hashPassword })
        res.status(201).send({ subscription: newUser.subscription, email: newUser.email, })
    } catch (error) {
        next(error)
    }
}
exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const user = await UserModel.findOne({ email })
        if (!user) {
            throw new NotFound('User not found')
        }
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            throw new Unauthorized('Email or password is wrong')
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN })
        await UserModel.findByIdAndUpdate(user._id, { $set: { token } }, { new: true })
        res.status(200).send({
            token,
            user: {
                email: user.email,
                subscription: user.subscription
            }
        })
    } catch (error) {
        next(error)
    }
}
exports.logout = async (req, res, next) => {
    try {
        const { _id } = req.user
        await UserModel.findByIdAndUpdate(_id, { $set: { token: "" } })
        return res.status(204).send()
    } catch (error) {
        next(err)
    }
}