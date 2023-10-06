const Product = require("../../model/product-model");

module.exports.index =async (req, res) => {
    const products = await Product.find({
        deleted: false,
        status: "active"
    }).sort({position: "desc"});

    const newArray = products.map(item=>{
        item.pricenew =(( item.price * (100 - item.discountPercentage))/100).toFixed(0);
        return item
    })

    res.render("clients/pages/products/index",{
        pageTitle: "Danh sach san pham",
        products : newArray
    })
}

module.exports.detail = async (req, res)=>{
    try {
        const slug = req.params.slug;
        const product = await Product.findOne({
            slug: slug,
            deleted: false,
            status: "active"
        })
        res.render("clients/pages/products/detail",{
            pageTitle : "Trang chi tiet san pham",
            product: product
        })
    } catch (error) {
        res.redirect("/");
    }
}