const express = require('express')
const routes = express.Router();
const controller = require("../../controllers/admin/accounts-controller");
const multer  = require('multer');
const uploadCloud = require("../../middlewares/admin/upClould-middlewares");

const upload = multer();


routes.get('/',controller.index);

routes.get('/create',controller.create);

routes.post('/create',
upload.single('avatar'),
uploadCloud.upload,
controller.createPost);

routes.get('/edit/:id',controller.edit);

routes.patch('/edit/:id',
upload.single('avatar'),
uploadCloud.upload,
controller.editPatch);


module.exports = routes;