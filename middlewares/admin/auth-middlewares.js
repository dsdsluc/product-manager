const systeamConfig = require("../../config/system");
const Accounts  = require("../../model/accounts-model");
const Role  = require("../../model/roles-model");


module.exports.requireAuth = async (req, res, next)=>{
    const token =req.cookies.token;
    if(!token){
        res.redirect(`/${systeamConfig.prefixAdmin}/auth/login`)
        return;
    }
    const user =  await Accounts.findOne({token:token})
    if(!user){
        res.redirect(`/${systeamConfig.prefixAdmin}/auth/login`)
        return;
    }
    const role =  await Role.findOne({_id:user.role_id}).select("title permissions")
    res.locals.role = role
    res.locals.user = user
    next();
}