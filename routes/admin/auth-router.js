const express = require('express')
const routes = express.Router();
const controller = require("../../controllers/admin/auth-controller");

routes.get('/login',controller.login);

routes.post('/login',controller.loginPost);

routes.get('/logout',controller.logout);

module.exports = routes;