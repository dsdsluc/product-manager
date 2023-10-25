const User = require("../../model/user-model");

module.exports.userInfor = async (req, res, next)=>{
    const tokenUser = req.cookies.tokenUser;
    if(tokenUser){
        const user = await User.findOne({
            tokenUser: tokenUser,
            deleted: false
        }).select("-password")

        res.locals.user = user
    }

    next()
}