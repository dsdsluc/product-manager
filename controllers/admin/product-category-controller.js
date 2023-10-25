const ProductCategory = require("../../model/products-categogy-model");

const createTree = require("../../helpers/createTree");
const systeamConfig = require("../../config/system");
module.exports.index = async (req, res) => {
    const find = {
        deleted: false
    }
    const records = await ProductCategory.find(find);
    const newRecords = createTree(records);
    res.render("admin/pages/products-category/index",{
        pageTitle: "Danh muc san pham",
        records: newRecords
    })
}

module.exports.create = async (req, res) => {
    const find = {
        deleted: false
    }
    
    const records = await ProductCategory.find(find);

    const newRecords = createTree(records);

  
    res.render("admin/pages/products-category/create",{
        pageTitle: "Tao danh muc san pham",
        records: newRecords
    })
}

module.exports.createPost = async (req,res)=>{
   
    if(req.body.position == ""){
        const countRecords = await ProductCategory.countDocuments();
        req.body.position = countRecords + 1;
    }
    else{
        req.body.position = parseInt(req.body.position );
    }
    
    const productCategory = new ProductCategory(req.body);
    productCategory.save();
    res.redirect(`/${systeamConfig.prefixAdmin}/products-category`);
}

module.exports.edit = async (req, res) => {
    const id = req.params.id;

    
    const data = await ProductCategory.findOne({
        _id: id,
        deleted : false
    });
    const records = await ProductCategory.find({
        deleted: false
    });

    const newRecords = createTree(records);

    res.render("admin/pages/products-category/edit",{
        pageTitle: "Tao danh muc san pham",
        data: data,
        records: newRecords
    })
}

module.exports.editPatch = async (req, res) => {
    const id = req.params.id ;
    const title = req.body.title
    req.body.position = parseInt(req.body.position );
 
    await ProductCategory.updateOne({_id : id }, req.body);
    req.flash('success', `Cap nhat san pham thanh cong ${title}`);
    res.redirect("back");
}