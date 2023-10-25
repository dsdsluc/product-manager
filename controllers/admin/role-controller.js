const Role  = require("../../model/roles-model");
const systeamConfig = require("../../config/system");

module.exports.index = async (req, res) => {
    const find = {
        deleted: false
    }
    const records = await Role.find(find);
    res.render("admin/pages/roles/index",{
        pageTitle: "Danh sach nhom quyen ",
        records: records
    })
}

module.exports.create = async (req, res) => {
    
    res.render("admin/pages/roles/create",{
        pageTitle: "Them moi nhom quyen ",
    })
}

module.exports.createPost = async (req, res) => {
    console.log(req.body)
    const record = new Role(req.body);
    await record.save();
    req.flash("success","Them mot nhom quyen thanh cong")
    res.redirect(`/${systeamConfig.prefixAdmin}/roles`)
}

module.exports.edit = async (req, res) => {
    try {
        const id = req.params.id;
        
        const data = await Role.findOne({
            _id: id,
            deleted: false
        })
        res.render("admin/pages/roles/edit",{
            pageTitle: "Chinh sua nhom quyen ",
            data: data
        })
    } catch (error) {
        res.redirect(`/${systeamConfig.prefixAdmin}/roles`)
    }
    
}

module.exports.editPatch = async (req, res) => {
    try {
        const id = req.params.id;
        
        await Role.updateOne({_id: id}, req.body)
        req.flash("success","Cap nhat thanh cong");
        res.redirect("back");
        
    } catch (error) {
        res.redirect(`/${systeamConfig.prefixAdmin}/roles`)
    }
    
}

module.exports.permissions = async (req, res) => {
    try {
        const records = await Role.find({
            deleted: false
        })
        res.render("admin/pages/roles/permissions",{
            pageTitle: " Trang phan quyen ",
            records: records
        })
        
    } catch (error) {
        res.redirect(`/${systeamConfig.prefixAdmin}/roles`)
    }
    
}

module.exports.permissionsPatch = async (req, res) => {
    try {
        const permissions = JSON.parse(req.body.permissions);
        for(const item of permissions){
            await Role.updateOne({
                _id: item.id
            },
            {
                permissions: item.permissions
            })
        }
        res.redirect("back");
        
    } catch (error) {
        res.redirect(`/${systeamConfig.prefixAdmin}/roles`)
    }
    
}