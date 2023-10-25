const md5 = require("md5");
const systeamConfig = require("../../config/system");
const Accounts = require("../../model/accounts-model");


module.exports.index = async (req, res) => {
    res.render("admin/pages/my-account/index",{
        pageTitle: "Thong tin ca nhan ",
        
    })
}
module.exports.edit = async (req, res) => {
    res.render("admin/pages/my-account/edit",{
        pageTitle: "Chỉnh sửa thông tin cá nhan ",
        
    })
}
module.exports.editPatch = async (req, res) => {
    if(req.body.password){
        req.body.password = md5(req.body.password)
    }
    else{
        delete  req.body.password
    }
    const user = res.locals.user
    await Accounts.updateOne({_id: user.id},req.body);
    req.flash("success","Cập nhật thành công")
    res.redirect("back")
}

