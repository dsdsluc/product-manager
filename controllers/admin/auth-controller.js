const md5 = require('md5');
const Accounts  = require("../../model/accounts-model");
const systeamConfig = require("../../config/system");

module.exports.login= async (req, res) => {

 
    res.render("admin/pages/auth/login",{
        pageTitle: "Dang nhap  ",
    })
}

module.exports.loginPost= async (req, res) => {
    const {email,password} = req.body
    const user = await Accounts.findOne({email: email})
    if(!user){
        req.flash("error","Email khong ton tai");
        res.redirect("back");
        return
    }
    if(user.password != md5(password)){
        req.flash("error","Mat khau khong dung");
        res.redirect("back");
        return
    }
    if(user.status == "inactive"){
        req.flash("error","Tai khoan da bi khoa");
        res.redirect("back");
    }
    res.cookie("token",user.token)
    res.redirect(`/${systeamConfig.prefixAdmin}/dashboard`)
}

module.exports.logout= async (req, res) => {
    res.clearCookie("token");
 
    res.redirect(`/${systeamConfig.prefixAdmin}/auth/login`)
}