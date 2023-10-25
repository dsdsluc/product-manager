const express = require('express')
const routes = express.Router()
const controller = require("../../controllers/clients/cart-controller");

routes.get('/', controller.index);

routes.get('/delete/:productId', controller.delete);


routes.post('/add/:productId', controller.addPost);

routes.get('/update/:productId/:quantity', controller.update);

module.exports = routes
