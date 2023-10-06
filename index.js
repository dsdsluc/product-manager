const express = require('express')
const app = express();
const cookieParser = require('cookie-parser')
const flash = require('express-flash');
const methodOverride = require('method-override');
const session = require('express-session');
const bodyParser = require("body-parser");
require('dotenv').config();

const adminConfig = require("./config/system")

const routes = require("./routes/clients/index-routes");
const routesAdmin = require("./routes/admin/index-routes");
const port = process.env.PORT;
const database = require("./config/database");
database.connect();
// Flash
app.use(flash());
app.use(cookieParser('keyboard cat'));
app.use(session({ cookie: { maxAge: 60000 }}));
// End Flash
app.use(express.static(`${__dirname}/public`));
app.set('views', `${__dirname}/views`);
app.set('view engine', 'pug')
app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({ extended: false }));

//Routes
routes(app);
routesAdmin(app);

// Variable
app.locals.prefixAdmin = adminConfig.prefixAdmin
// End Variable

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})