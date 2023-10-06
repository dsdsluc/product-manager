const express = require('express')
const routes = express.Router()
const controller = require("../../controllers/admin/product-controller");
const multer  = require('multer');
const storageMulterHelper = require("../../helpers/storageMulter");
const storage = storageMulterHelper();
const upload = multer({ storage: storage });
const validates = require("../../validates/admin/product-validates");

routes.get('/', controller.index);

routes.patch('/change-status/:status/:id', controller.changeStatus);

routes.patch('/change-multi', controller.changeMulti);

routes.delete('/delete/:id', controller.deleteItem);

routes.get('/create', controller.create);

routes.post('/create', upload.single('thumbnail'),validates.createPost,controller.createPost);

routes.get('/edit/:id', controller.edit);

routes.patch('/edit/:id', upload.single('thumbnail'),validates.createPost,controller.editPatch);

routes.get('/detail/:id', controller.detail);

module.exports = routes
