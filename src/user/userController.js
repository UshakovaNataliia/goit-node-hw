const { Unauthorized } = require("../helpers/errors");
const UserModel = require("./userModel");

exports.getCurretUser = (req, res, next) => {
    const { subscription, email } = req.user
    res.status(200).send({
        subscription, email
    })
}
exports.avatar = async (req, res, next) => {
    const { user } = req;
    const { file } = req;
    try {
        const newImagePath = `http://localhost:3000/images/${file.filename}`;
        const updatedImage = await UserModel.findByIdAndUpdate(user._id, { avatarURL: newImagePath, }, { new: true });
        return res.status(200).send({ avatarURL: updatedImage.avatarURL })
    } catch (error) {
        throw new Unauthorized('Not authorized')
    }
}