const Product = require("../../model/product-model");

const productHelper = require("../../helpers/product");

module.exports.index =async (req, res) => {
    let newProduct = [];
    const keyword = req.query.keyword;
    if(keyword){
        const keywordRegex = new RegExp(keyword, "i");

        const products = await Product.find({
            title: keywordRegex,
            status: "active",
            deleted: false
        })
        newProduct = productHelper.priceNewProducts(products)
    }


    res.render("clients/pages/search/index",{
        pageTitle: "Kết quả tìm kiếm",
        keyword: keyword,
        products: newProduct
    })
}