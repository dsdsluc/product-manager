const express = require('express')
const routes = express.Router();
const controller = require("../../controllers/clients/home-controller");

routes.get('/',controller.index);

module.exports = routes;