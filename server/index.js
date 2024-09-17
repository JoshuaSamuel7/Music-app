const express=require('express');
const app=express();
app.use(express.json());
const cors=require('cors')
const cloudinary=require('cloudinary').v2
const passport=require('./config/passport');
const homeRoutes=require("./routes/homeRoutes");
const connectDB = require('./config/db');
const authRoutes=require('./routes/authRoutes')
const dotenv=require('dotenv').config;
const cookieParser = require('cookie-parser');
app.use(cors({
    origin:"http://localhost:3000",
    credentials:true
}))
app.use(cookieParser())
app.use(passport.initialize())
app.use(homeRoutes);
app.use(authRoutes);
connectDB();
cloudinary.config({ 
    cloud_name: process.env.CLOUD, 
    api_key: process.env.CKEY,
    api_secret: process.env.SECRET
});
app.listen(8000,()=>{
    console.log("Server is live at 8000");
})