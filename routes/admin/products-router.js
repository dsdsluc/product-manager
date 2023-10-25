const express = require('express')
const routes = express.Router();
const multer  = require('multer');

const uploadCloud = require("../../middlewares/admin/upClould-middlewares");

// const storageMulterHelper = require("../../helpers/storageMulter");
// const storage = storageMulterHelper();

const upload = multer();

const controller = require("../../controllers/admin/product-controller");
const validates = require("../../validates/admin/product-validates");

routes.get('/', controller.index);

routes.patch('/change-status/:status/:id', controller.changeStatus);

routes.patch('/change-multi', controller.changeMulti);

routes.delete('/delete/:id', controller.deleteItem);

routes.get('/create', controller.create);

routes.post('/create', 
upload.single('thumbnail'),
uploadCloud.upload,
validates.createPost,controller.createPost);

routes.get('/edit/:id', controller.edit);

routes.patch('/edit/:id', upload.single('thumbnail'),
uploadCloud.upload,
validates.createPost,controller.editPatch);

routes.get('/detail/:id', controller.detail);

module.exports = routes
