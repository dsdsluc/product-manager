const express = require('express')
const routes = express.Router()
const controller = require("../../controllers/clients/search-controller");

routes.get('/', controller.index);

module.exports = routes
