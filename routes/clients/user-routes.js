const express = require('express')
const routes = express.Router()
const controller = require("../../controllers/clients/user-controller");

const validates = require("../../validates/clients/user-validates")

routes.get('/register', controller.register);

routes.post('/register',validates.userPost, controller.registerPost);

routes.get('/login', controller.login);

routes.post('/login',validates.loginPost, controller.loginPost);

routes.get('/logout', controller.logout);

routes.get('/password/forgot', controller.forgotPassword);

routes.post('/password/forgot',validates.forgotPasswordPost, controller.forgotPasswordPost);

routes.get('/password/otp', controller.otpPassword);

routes.post('/password/otp', controller.otpPasswordPost);

routes.get('/password/reset', controller.resetPassword);

routes.post('/password/reset',validates.resetPasswordPost, controller.resetPasswordPost);

module.exports = routes