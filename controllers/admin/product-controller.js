const Product = require("../../model/product-model");
const ProductCategory = require("../../model/products-categogy-model");
const Account = require("../../model/accounts-model");

const filterStatusHelper = require("../../helpers/filterStatus");
const searchHelper = require("../../helpers/search");
const paginationHelper = require("../../helpers/pagination");
const systeamConfig = require("../../config/system");
const createTree = require("../../helpers/createTree");

module.exports.index = async (req, res) => {
    
    try {
        const filterStatus = filterStatusHelper(req.query)
    let objectSearch = searchHelper(req.query);

    let find = {
        deleted: false
    }
    if(req.query.status){
        find.status = req.query.status;
    }
   if(req.query.keyword){
    find.title = objectSearch.regex
   }
   // Pagination 
   let initPagination ={
    currentPage : 1,
    limitItem: 4
   }
   const itemTotal = await Product.count(find);
   objectPagination = paginationHelper(initPagination,req.query,itemTotal)
   // End Pagination 


   //Sort
   let sort = {};
   if(req.query.sortKey && req.query.sortValue){
    sort[req.query.sortKey ] = req.query.sortValue
   }
   else{
    sort.position = "desc";
   }
    const products = await Product.find(find).limit(objectPagination.limitItem)
    .skip( objectPagination.skip)
    .sort(sort);
    for (const product of products) {
        // Lay ra nguoi tao
        const userCreated = await Account.findOne({_id: product.createBy.account_id})
        if(userCreated){
            product.createBy.accountFullname = userCreated.fullName
        }
        // lay ra nguoi cap nhat
        const userUpdatedId = product.updatedBy.slice(-1)[0];
        if(userUpdatedId){
            const userUpdate = await Account.findOne({_id:userUpdatedId.account_id});
            if(userUpdate){
                product.updatedBy.accountFullname = userUpdate.fullName
            }
        }
       
       
    }

    res.render("admin/pages/products/index",{
        pageTitle: "Danh sach san pham",
        products : products,
        filterStatus : filterStatus,
        keyword: objectSearch.keyword,
        pagination: objectPagination
    })
    } 
    catch (error){
        req.flash("error","Khong co trang nay");
        res.redirect(`/${systeamConfig.prefixAdmin}/products`);
    }
} 
module.exports.changeStatus = async (req,res)=>{
    const updatedBy = {
        account_id: res.locals.user.id,
        updateAt: new Date()
    }
    const {status,id}=req.params;
    await Product.updateOne({ _id: id }, { 
        status: status,
        $push : {updatedBy: updatedBy}
     });
    req.flash('success', 'Cap nhat thanh cong');
    res.redirect('back')
}  

module.exports.changeMulti = async (req,res)=>{

    const { type }= req.body;
    const ids =  req.body.ids.split(", ");
    const updatedBy = {
        account_id: res.locals.user.id,
        updateAt: new Date()
    }
    switch (type) {
        case "active":
        case "inactive":
            await Product.updateMany({ _id: {$in : ids} }, { 
                status: type,
                $push : {updatedBy: updatedBy}
            });
            req.flash('success', `Cap nhat thanh cong trang thai ${ids.length}`);
            break;
        case "delete-all":
            await Product.updateMany({ _id: {$in : ids} },{ 
                deleted: true, 
                deletedBy: {
                    account_id: res.locals.user.id,
                    deleteAt:  new Date()
                }
            });
            break;
        
        case "change-position":
            for (const item of ids) {
                const [id, position] = item.split("-");
                await Product.updateOne({ _id: id }, { 
                    position: position,
                    $push : {updatedBy: updatedBy}
                });
            }
            req.flash('success', `Cap nhat thanh cong vi tri ${ids.length}`);
            break;
        default:
            break;
    }
    res.redirect("back")
}
module.exports.deleteItem = async (req,res)=>{
    const id = req.params.id;
    await Product.updateOne({_id: id}, {
        deleted: true, 
        deletedBy: {
            account_id: res.locals.user.id,
            deleteAt:  new Date()
        }
    });
    res.redirect("back");
}

module.exports.create = async (req,res)=>{
    const records = await ProductCategory.find({
        deleted: false
    });

    const newRecords = createTree(records);

    res.render("admin/pages/products/create",{
        pageTitle: "Tao moi san pham",
        records: newRecords
    })
}
module.exports.createPost = async (req,res)=>{
    
    const user_id = res.locals.user.id
    req.body.price = parseInt( req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    if(req.body.position == ""){
        const countProduct = await Product.countDocuments();
        req.body.position = countProduct + 1;
    }
    // if(req.file && req.file.filename){
    //     req.body.thumbnail = `/uploads/${req.file.filename}`
    // }
    req.body.createBy = {
        account_id : user_id
    }
    const product = new Product(req.body);
    product.save();
    res.redirect(`/${systeamConfig.prefixAdmin}/products`)
}

module.exports.edit = async (req,res)=>{
   try {
    const id = req.params.id;
    const productItem = await Product.findOne({_id: id});
    const records = await ProductCategory.find({
        deleted: false
    });

    const newRecords = createTree(records);
    res.render("admin/pages/products/edit",{
        pageTitle: "Chinh sua san pham",
        productItem : productItem,
        records: newRecords
    })
   } catch (error) {
    res.redirect(`/${systeamConfig.prefixAdmin}/products`)
   }

}

module.exports.editPatch = async (req,res)=>{
    const id = req.params.id
    req.body.price = parseInt( req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.position = parseInt(req.body.position);
    req.body.stock = parseInt( req.body.stock)
    if(req.file && req.file.filename){
        req.body.thumbnail = `/uploads/${req.file.filename}`
    }
    const updatedBy = {
        account_id: res.locals.user.id,
        updateAt: new Date()
    }
   await Product.updateOne({_id: id}, {
    ...req.body,
    $push : {updatedBy: updatedBy}
   });
   req.flash("success", "Cap nhan san pham thanh cong")
    res.redirect("back");
}
module.exports.detail = async (req,res)=>{
   try {
    const id = req.params.id;
    const productItem = await Product.findOne({_id: id});
    res.render("admin/pages/products/detail",{
        pageTitle: "Chinh sua san pham",
        productItem : productItem
    })
   } catch (error) {
    res.redirect(`/${systeamConfig.prefixAdmin}/products`)
   }

}