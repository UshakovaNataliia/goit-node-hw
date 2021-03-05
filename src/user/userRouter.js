const { Router } = require('express')
const { authorize } = require('../helpers/authorizeMiddleware')
const { getCurretUser } = require('./usersController')
const { imageCreator } = require('../helpers/imageCreator')
const router = Router()

router.get('/current', authorize, getCurretUser)
router.patch('/avatar', authorize, imageCreator, avatar)

exports.userRouter = router