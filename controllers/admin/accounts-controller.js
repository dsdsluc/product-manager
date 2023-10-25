const md5 = require('md5');

const Account  = require("../../model/accounts-model");
const systeamConfig = require("../../config/system");
const Role  = require("../../model/roles-model");


module.exports.index = async (req, res) => {
    const find = {
        deleted: false
    }
    const records = await Account.find(find);
    for (const item of records) {
        const role = await Role.findOne({_id: item.role_id});
        item.role = role
    }
    res.render("admin/pages/accounts/index",{
        pageTitle: "Danh sach tai khoan ",
        records: records
    })
}
module.exports.create = async (req, res) => {
    const roles = await Role.find({
        deleted: false
    })
    res.render("admin/pages/accounts/create",{
        pageTitle: "Tạo  tài khỏan ",
        roles: roles
        
    })
}

module.exports.createPost = async (req, res) => {
    req.body.password = md5(req.body.password);

    const record = new Account(req.body);
    await record.save()

    res.redirect(`/${systeamConfig.prefixAdmin}/accounts`)
}

module.exports.edit = async (req, res) => {
    try {
        const id = req.params.id;
        const find = {
            _id: id,
            deleted: false
        }
        const data = await Account.findOne(find);
        const roles = await Role.find({deleted: false})
        res.render("admin/pages/accounts/edit",{
            pageTitle: "Chinh sua tài khỏan ",
            roles: roles,
            data: data
            
        })
    } catch (error) {
        res.redirect(`/${systeamConfig.prefixAdmin}/accounts`)
    }
    
}


module.exports.editPatch = async (req, res) => {
    if(req.body.password){
        req.body.password = md5(req.body.password);
    }
    else{
        delete req.body.password
    }    

   await Account.updateOne({_id: req.params.id},req.body)

    res.redirect(`back`)
}