const productRoutes = require("./product-routes");
const homeRoutes = require("./home-routes");

module.exports = (app)=>{
    app.use('/', homeRoutes);
    app.use('/products',productRoutes)
    
}