  
exports.getCurretUser = (req, res, next) => {
    const { subscription, email } = req.user
    res.status(200).send({
        subscription, email
    })
}