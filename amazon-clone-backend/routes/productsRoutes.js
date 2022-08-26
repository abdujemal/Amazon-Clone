const express = require('express')

const router = express.Router()

const controller = require('../controllers/productController')

router.get("/", controller.products_get)

router.post("/", controller.products_post)


module.exports = router
