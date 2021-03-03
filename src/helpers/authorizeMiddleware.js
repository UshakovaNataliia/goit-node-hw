const jwt = require('jsonwebtoken')
const UserModel = require('../user/userModel')
const { Unauthorized } = require('./errors')
exports.authorize = async (req, res, next) => {
    try {
        const authHeader = req.get("Authorization" || "")
        const token = authHeader.replace("Bearer ", "")
        let payload
        try {
            payload = await jwt.verify(token, process.env.JWT_SECRET)
        } catch (error) {
            throw new Unauthorized("Not valid token or not provided")
        }
        const user = await UserModel.findById(payload.userId)
        if (!user) {
            throw new Unauthorized('Not valid token')
        }
        req.user = user;
        next()
    } catch (error) {
        next(error)
    }
}