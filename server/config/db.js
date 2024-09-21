const mongoose=require("mongoose");
require('dotenv').config();
const connectDB=async ()=>{
try{
    await mongoose.connect(`mongodb+srv://${process.env.MYDBUSER}:${process.env.MYDBPASS}@myatlasclusteredu.3ebfqvk.mongodb.net/music`);
    console.log("DB Connected");
}
catch(error){
    console.log("Error connecting to DB",error);
    
}
}
module.exports=connectDB;