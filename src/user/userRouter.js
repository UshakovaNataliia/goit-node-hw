const { Router } = require('express')
const { authorize } = require('../helpers/authorizeMiddleware')
const { getCurretUser } = require('./usersController')
const router = Router()
router.get('/current', authorize, getCurretUser)
exports.userRouter = router