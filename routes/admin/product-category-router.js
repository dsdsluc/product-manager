const express = require('express');
const multer  = require('multer');
const routes = express.Router();


const uploadCloud = require("../../middlewares/admin/upClould-middlewares");
const upload = multer();
const controller = require("../../controllers/admin/product-category-controller");
routes.get('/', controller.index);

routes.get('/create', controller.create);

routes.post('/create',
upload.single('thumbnail'),
uploadCloud.upload,
controller.createPost);

 routes.get('/edit/:id', controller.edit);
 routes.patch('/edit/:id',
 upload.single('thumbnail'),
uploadCloud.upload,
  controller.editPatch);


module.exports = routes;