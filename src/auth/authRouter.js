const { Router } = require('express');
const { authorize } = require('../helpers/authorizeMiddleware');
const { validate } = require('../helpers/validateMiddleware');
const { createUserSchema, loginSchema } = require('../user/userSchemes');
const { register, login, logout } = require('./authController');
const { checkVerification } = require('../helpers/emailSender');
const router = Router()

router.post('/register', validate(createUserSchema), register)
router.post('/login', validate(loginSchema), login)
router.post('/logout', authorize, logout)
router.get('/verify/:verificationToken', checkVerification)

exports.routerAuth = router