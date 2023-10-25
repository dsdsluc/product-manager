const ProductCategory = require("../../model/products-categogy-model");

const createTree = require("../../helpers/createTree");

module.exports.category = async (req,res,next)=>{
    const categoryProducts = await ProductCategory.find({
        deleted: false
    })
    const newcategoryProducts = createTree(categoryProducts);
    res.locals.layoutProductCategory= newcategoryProducts;
    next();
}