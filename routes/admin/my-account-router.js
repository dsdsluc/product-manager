const express = require('express')
const routes = express.Router();
const controller = require("../../controllers/admin/my-account-controller");
const multer  = require('multer');
const uploadCloud = require("../../middlewares/admin/upClould-middlewares");

const upload = multer();

routes.get('/',controller.index);

routes.get('/edit',controller.edit);

routes.patch('/edit',
upload.single('avatar'),
uploadCloud.upload,
controller.editPatch);


module.exports = routes;