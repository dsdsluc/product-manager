const productRoutes = require("./product-routes");
const homeRoutes = require("./home-routes");
const searchRoutes = require("./search-routes");
const cartRoutes = require("./cart-routes");
const checkoutRoutes = require("./checkout-routes");
const useroutRoutes = require("./user-routes");

const categoryMiddleware = require("../../middlewares/client/category-middleware");
const cartMiddleware = require("../../middlewares/client/cart-middleware");
const userMiddleware = require("../../middlewares/client/user-middleware");



module.exports = (app)=>{
    app.use(categoryMiddleware.category);

    app.use(cartMiddleware.cartId);

    app.use(userMiddleware.userInfor);

    app.use('/',homeRoutes);

    app.use('/products',productRoutes);

    app.use('/search',searchRoutes);
    
    app.use('/cart',cartRoutes);

    app.use('/checkout',checkoutRoutes);

    app.use('/user',useroutRoutes);

    
}