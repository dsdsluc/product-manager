const User = require("../../model/user-model");
const ForgotPassword = require("../../model/forgot-password-model");
const md5 = require("md5")
const generate = require("../../helpers/generate");
const sendMailHelp = require("../../helpers/sendMail")
module.exports.register = async (req, res) => {
    

    res.render("clients/pages/user/register",{
        pageTitle: "Trang đăng kí"
        
    })
}

module.exports.registerPost = async (req, res) => {
    const exitEmail = await User.findOne({
        email: req.body.email
    });
    if(exitEmail){
        req.flash("error","Email đã tồn tại");
        res.redirect("back");
        return;
    }
    req.body.password = md5(req.body.password);
    const user = new User(req.body);
    await user.save();

    res.cookie("tokenUser",user.tokenUser)

    res.redirect("/")
}

module.exports.login = async (req, res) => {
    

    res.render("clients/pages/user/login",{
        pageTitle: "Trang đăng nhập"
        
    })
}

module.exports.loginPost = async (req, res) => {
    const {email, password} = req.body
    const user = await User.findOne({
        email: email,
        deleted: false
    })
    
    if(!user){
        req.flash('error', `Tài khoản không tồn tại`);
        res.redirect("back");
        return;
    }
    if(user.password != md5(password)){
        req.flash('error', `Sai mật khẩu`);
        res.redirect("back");
        return;
    }
    if(user.status == "inactive"){
        req.flash('error', `Tài khoản đã bị khóa`);
        res.redirect("back");
        return;
    }

    res.cookie("tokenUser", user.tokenUser);
    res.redirect("/");
}

module.exports.logout = async (req, res) => {
    res.clearCookie("tokenUser")

    res.redirect("/")
}

module.exports.forgotPassword = async (req, res) => {
    
    res.render("clients/pages/user/forgot-password",{
        pageTitle: "Quen mat khau"
        
    })
}

module.exports.forgotPasswordPost = async (req, res) => {
    const otp = generate.generateRandomNumber(8)
    const email = req.body.email
    const user = await User.findOne({
        email: req.body.email
    })
    if(!user){
        req.flash('error', `Email Không đúng`);
        res.redirect("back");
        return;
    }
    const objectForgotPassword = {
        otp: otp,
        email:  req.body.email,
        expireAt: Date.now()
    }

    const forgotPassword = new ForgotPassword(objectForgotPassword);
    await forgotPassword.save();

    const subject = `Mã xác nhận đổi mật khẩu`
    const html = `Mã xác nhận của  bạn là <b>${otp}</b>`
    sendMailHelp.sendMail(email,subject,html)



    res.redirect(`/user/password/otp?email=${email}`)
}

module.exports.otpPassword = async (req, res) => {
    const email = req.query.email;

    res.render("clients/pages/user/otp-password",{
        pageTitle: "Nhập OTP",
        email: email
    })
}
module.exports.otpPasswordPost = async (req, res) => {
    const email = req.body.email;
    const otp = req.body.otp;
    const resutl = await ForgotPassword.findOne({
        email: email,
        otp: otp
    })
    if(!resutl){
        req.flash('error', `Sai mật khẩu`);
        res.redirect("back");
        return;
    }

    const user = await User.findOne({
        email: email
    })
    res.cookie("tokenUser", user.tokenUser)
    res.redirect("/user/password/reset")
}

module.exports.resetPassword = async (req, res) => {
   
    res.render("clients/pages/user/reset-password",{
        pageTitle: "Đổi mật khẩu",
    })
}

module.exports.resetPasswordPost = async (req, res) => {
    const tokenUser = req.cookies.tokenUser;
    const password = req.body.password;

    await User.updateOne({
        tokenUser: tokenUser
    },{
      password: md5(password)  
    })
    
    res.redirect("/")
}