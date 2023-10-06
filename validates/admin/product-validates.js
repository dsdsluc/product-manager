module.exports.createPost = (req, res, next)=>{
    if(!req.body.title){
        req.flash('error', `Vui long nhap ten san pham`);
        res.redirect("back");
        return;
    }
    if(req.body.title.length < 5 ){
        req.flash('error', `Ten san pham phai dai hon 5 ki tu`);
        res.redirect("back");
        return;
    }
    next();
}