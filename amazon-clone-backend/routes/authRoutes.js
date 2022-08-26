const express = require('express')

const router = express.Router()

const controller = require('../controllers/authControllers')

router.post("/login", controller.login_post)

router.post("/signup", controller.signup_post)

router.get("/logout", controller.logout_get)

router.get("/authenticate", controller.authenticate)


module.exports = router