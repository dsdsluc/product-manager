const Product = require("../../model/product-model");
const productHelper = require("../../helpers/product");
module.exports.index = async (req, res) => {
    const featuredProduct = await Product.find({
        featured: "1",
        deleted: false,
        status: "active"
    }).limit(6)
    const newfeaturedProduct = productHelper.priceNewProducts(featuredProduct);


    const productsNew = await Product.find({
        deleted: false,
        status: "active"
    }).sort({position: "desc"}).limit(6)

    res.render("clients/pages/home/index",{
        pageTitle: "Trang chu",
        productsFeatured: newfeaturedProduct,
        productsNew: productsNew
    })
}