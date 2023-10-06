const express = require('express')
const routes = express.Router()
const controller = require("../../controllers/clients/product-controller");

routes.get('/', controller.index)
routes.get('/detail/:slug', controller.detail)

module.exports = routes
