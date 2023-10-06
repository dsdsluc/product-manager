const mongoose = require('mongoose');

module.exports.connect = async ()=>{
    try {
        console.log("Connect Sucess!");
        await mongoose.connect(process.env.MONGO_URL);
    } catch (error) {
        console.log("Connect Error!")
    }
}