const Cart = require("../../model/cart-model");
const Products = require("../../model/product-model");

const productHelper = require("../../helpers/product");

module.exports.index = async (req, res) => {
    const cart = await Cart.findOne({
        _id: req.cookies.cartId
    })

    if(cart.products.length > 0 ){
        for (const item of cart.products) {
            const productId = item.product_id;
            const productInfor = await Products.findOne({
                _id: productId
            })
            item.productInfor = productInfor

            item.productInfor.priceNew = productHelper.priceNewProduct(item.productInfor);
            item.productInfor.totalPrice = item.productInfor.priceNew * item.quantity

        }
    }

    cart.totalPrice = cart.products.reduce((sum, item)=> sum + item.productInfor.totalPrice ,0)

    res.render("clients/pages/cart/index",{
        pageTitle: "Giỏ hàng",
        cartDetail: cart
    })
}

module.exports.delete = async (req, res) => {
    const cartId = req.cookies.cartId;
    const productId = req.params.productId;
    await Cart.updateOne({
        _id: cartId
    },{
        "$pull": {
            products: {
                "product_id" : productId
            }
        }
    })
    req.flash("success","Xoa san pham thanh cong")
    res.redirect("back")
}

module.exports.addPost = async (req, res) => {
    
    const cartId = req.cookies.cartId
    const productId = req.params.productId;
    const quantity = parseInt(req.body.quantity);
    const cart = await Cart.findOne({
        _id: cartId
    });

    const exsitProductInCart = cart.products.find(item=>item.product_id == productId );
    if(exsitProductInCart){
        const newQuantity = quantity + exsitProductInCart.quantity;

        await Cart.updateOne({
            _id: cartId,
            'products.product_id': productId
        },{
            'products.$.quantity': newQuantity
        })
    }
    else{
      
        const cartObject = {
            product_id: productId,
            quantity: quantity
        }
        await Cart.updateOne({_id:cartId },{
            $push: {products: cartObject}
        })
    }
    
    req.flash("success","Thêm vào giỏ hàng thành công")
    res.redirect("back")
}

module.exports.update = async (req, res) => {
    const cartId = req.cookies.cartId;
    const productId = req.params.productId
    const quantity = req.params.quantity

    await Cart.updateOne({
        _id: cartId,
        'products.product_id': productId
    },{
        "products.$.quantity": quantity
    })
    req.flash("success","Đã cập nhật số lượng  thành công");
    res.redirect("back");
}