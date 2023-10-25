const express = require('express')
const routes = express.Router()
const controller = require("../../controllers/clients/checkout-controller");

routes.get('/', controller.index);

routes.post('/order', controller.orderPost);

routes.get('/success/:orderId', controller.success);


module.exports = routes
