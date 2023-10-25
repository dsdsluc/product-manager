const Cart = require("../../model/cart-model");
const Product = require("../../model/product-model");
const Order = require("../../model/checkout-model");

const productHelper = require("../../helpers/product");



module.exports.index = async (req, res) => {
    const cart = await Cart.findOne({
        _id: req.cookies.cartId
    })

    if(cart.products.length > 0 ){
        for (const item of cart.products) {
            const productId = item.product_id;
            const productInfor = await Product.findOne({
                _id: productId
            })
            item.productInfor = productInfor

            item.productInfor.priceNew = productHelper.priceNewProduct(item.productInfor);
            item.productInfor.totalPrice = item.productInfor.priceNew * item.quantity

        }
    }

    cart.totalPrice = cart.products.reduce((sum, item)=> sum + item.productInfor.totalPrice ,0)

    res.render("clients/pages/checkout/index",{
        pageTitle: "Giỏ hàng",
        cartDetail: cart
    })
}


module.exports.orderPost = async (req, res) => {
    const cartId = req.cookies.cartId;
    const userInfor = req.body;
    const cart = await Cart.findOne({
        _id: cartId
    })
    let products = []
    for (const product of cart.products) {
        const objectProduct = {
            product_id : product.product_id,
            quantity: product.quantity
            
        }

        const productInfor = await Product.findOne({
            _id: product.product_id
        })
        objectProduct.discountPercentage = productInfor.discountPercentage
        objectProduct.price = productInfor.price
        products.push(objectProduct)
    }
    const objectOrder = {
        cart_id: cartId,
        userInfor: userInfor,
        products: products
    }
    const order = new Order(objectOrder);
    await order.save();

    await Cart.updateOne({
        _id: cartId
    },{
        products: []
    })
    res.redirect(`/checkout/success/${order.id}`)
}


module.exports.success = async (req, res) => {
    const orderId = req.params.orderId;
    const order = await Order.findOne({
        _id: orderId
    })

    for (const product of order.products) {
        const productInfor = await Product.findOne({
            _id: product.product_id
        }).select("title thumbnail");

        product.productInfor = productInfor
        product.priceNew = productHelper.priceNewProduct(product);
        product.totalPrice = product.priceNew * product.quantity
    }
    
    order.totalPrice = order.products.reduce((sum, item)=> sum+ item.totalPrice,0)
    res.render("clients/pages/checkout/success",{
        pageTitle: "Đặt hàng thành công",
        order: order
        
    })
}