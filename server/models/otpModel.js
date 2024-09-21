const mongoose=require('mongoose');
const OTPSchema=new mongoose.Schema({
    email:{type:String, unique:true},
    otp:Number,
    createdAt:{
        type:Date,
        default:Date.now,
        expires:60*10
    }
})
module.exports=mongoose.model('Otp',OTPSchema);