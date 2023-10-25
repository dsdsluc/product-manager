const Product = require("../../model/product-model");
const ProductCategory = require("../../model/products-categogy-model");

const productHelper = require("../../helpers/product");
module.exports.index =async (req, res) => {
    const products = await Product.find({
        deleted: false,
        status: "active"
    }).sort({position: "desc"});

    const newArray = productHelper.priceNewProducts(products)

    res.render("clients/pages/products/index",{
        pageTitle: "Danh sach san pham",
        products : newArray
    })
}

module.exports.category =async (req, res) => {
    const slugCategory = req.params.slugCategory;
    
    const category = await ProductCategory.findOne({
        deleted: false,
        slug: slugCategory,
        status: "active"
    });

    const getSubCategory = async (parentId)=>{
        const subs = await ProductCategory.find({
            deleted: false,
            status: "active",
            parent_id: parentId
        });

        let allsubs = [...subs];
        for(const sub of subs){
            const childs = await getSubCategory(sub.id);
            if(childs){
                allsubs = allsubs.concat(childs);
            }
        }
        return allsubs
    }
    const listSubCategory = await getSubCategory(category.id);
    const listSubCategoryId = listSubCategory.map(item=>item.id);
    const products = await Product.find({
        product_category_id: {$in: [category.id,...listSubCategoryId]},
        deleted: false,
        status: "active"
    }).sort({position: "desc"});

    const newArray = productHelper.priceNewProducts(products)

    res.render("clients/pages/products/index",{
        pageTitle: category.title,
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
        const category = await ProductCategory.findOne({
            _id: product.product_category_id,
            status : "active",
            deleted: false
        })
        product.category = category;

        product.priceNew = productHelper.priceNewProduct(product);
        res.render("clients/pages/products/detail",{
            pageTitle : "Trang chi tiet san pham",
            product: product
        })
    } catch (error) {
        res.redirect("/");
    }
}