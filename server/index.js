const express=require('express');
const app=express();
app.use(express.json());
const cors=require('cors')
const cloudinary=require('cloudinary').v2
const passport=require('./config/passportUser');
const homeRoutes=require("./routes/homeRoutes");
const connectDB = require('./config/db');
const authRoutes=require('./routes/authRoutes')
const dotenv=require('dotenv').config;
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
app.use(cors({
    origin:"http://localhost:3000",
    credentials:true
}))
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 1000, 
    message: "Too many requests from this IP, please try again after 15 minutes."
  });
const adminRoutes=require("./routes/adminRoutes");
app.use(limiter);
app.use(cookieParser())
app.use(passport.initialize())
app.use("/api/admin",adminRoutes);
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
