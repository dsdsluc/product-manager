const systemConfig = require("../../config/system");
const dashboardRouter = require("./dashboard-router");
const productsRouter = require("./products-router");
const productsCategoryRouter = require("./product-category-router");
const rolesRouter = require("./role-router");
const accountsRouter = require("./accounts-router");
const authRouter = require("./auth-router");
const myAccount = require("./my-account-router");

const authMiddlewares = require("../../middlewares/admin/auth-middlewares");

module.exports = (app)=>{
    const PATH_ADMIN = "/" + systemConfig.prefixAdmin;

    app.use(PATH_ADMIN + '/dashboard',
        authMiddlewares.requireAuth,
        dashboardRouter);

    app.use(PATH_ADMIN + '/products', 
    authMiddlewares.requireAuth,
    productsRouter);

    app.use(PATH_ADMIN + '/products-category',
    authMiddlewares.requireAuth,
     productsCategoryRouter);

    app.use(PATH_ADMIN + '/roles',
    authMiddlewares.requireAuth,
     rolesRouter);

    app.use(PATH_ADMIN + '/accounts',
        authMiddlewares.requireAuth,
        accountsRouter);
    
    app.use(PATH_ADMIN + '/auth',  authRouter);

    app.use(PATH_ADMIN + '/my-account',
        authMiddlewares.requireAuth,
        myAccount);
    
}