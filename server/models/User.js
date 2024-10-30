const mongoose=require("mongoose")
const mongooseSchema=new mongoose.Schema({
    username:{type:String,unique:true},
    password:String,
    name:String
})
module.exports=mongoose.model("AdminUser",mongooseSchema)