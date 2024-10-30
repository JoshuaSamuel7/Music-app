const AdminUser=require("../models/User");
const User=require("../models/userSchema")
const Music = require('../models/songsSchema');
const jwt = require("jsonwebtoken")
const bcrypt=require("bcrypt")
exports.login=async (req,res)=>{
    try{
        const {username,password}=req.body;
        const user=await AdminUser.findOne({username});
        if(!user){
            return res.status(404).json({message:"Invalid Username or Password"})
        }
        const passwordmatch=bcrypt.compare(password,user.password);
        if(!passwordmatch){
            return res.status(401).json({message:"Invalid Username or Password"})
        }
        const payload={id:user._id, email:user.username}
        const token=jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:"1h"})
        res.cookie("admin",token,{
            path:"/",
            maxAge:1000*60*15,
            httpOnly:true,
            secure:true,
        })
        return res.status(200).json({message:"Login Success",user:user})
   }catch(err){
    res.status(500).json({message:"Sever Error Occurred",err:err})
    console.log(err);
    
    }
}
exports.register=async(req,res)=>{
    try{
        const {username,password,name}=req.body;
        const checkuser=await AdminUser.findOne({username})
        if(checkuser){
            return res.status(400).json({message:"User already exists"})
        }
        const newUser= new AdminUser ({
            username,
            password,
            name
        })
        await newUser.save();
        return res.status(201).json({message:"User Created Successfully"})
    }catch(err){
        console.log(err);
        return res.status(500).json({message:"Server Error",err:err})
    }
}
exports.verify = (req, res) => {
    const token = req.cookies.admin;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    try {
      const verified = jwt.verify(token, process.env.JWT_SECRET);
      res.status(200).json({ user: verified });
    } catch (err) {
      res.status(401).json({ message: "Invalid token" });
    }
  };
exports.logout=async(req,res)=>{
    try{
        res.cookie("admin","",{
            maxAge:0,
            path:"/",
            secure:true,
            httpOnly:true,
            sameSite:true
        })
        res.status(200).json({message:"Logout Success"})
    }catch(err){
        console.log(err);
        res.status(500).json({message:"Server err",err:err})
    }
}
exports.getUsers=async(req,res)=>{
    try{
        const users=await AdminUser.find();
        return res.json({message:"Success",users:users})
    }catch(err){
        console.log(err);
        return res.status(500).json({message:"Error retrieving Users"})
    }
}
exports.deleteUsers=async (req,res)=>{
    try{
        const username=req.body.username;
        await AdminUser.findOneAndDelete({username});
        return res.status(200).json({message:"User Deleted"})
    }catch{
        return res.status(500).json({message:"Error Deleting"})
    }

}
exports.getMusicUsers=async(req,res)=>{
    try{
        const musicUsers=await User.find()
        return res.status(200).json({message:"Success",musicUsers:musicUsers})
    }catch(err){
        return res.status(500).json({message:"Error retirving Music Users"})
        console.log(err); 
    }
}
exports.putMusicUsers=async(req,res)=>{
    try{
        const {id,email,name,mobile}=req.body;        
        const updated=await User.findByIdAndUpdate(id,{email,name,mobile});
        if(!updated){
            return res.status(404).json({message:"User not Found"})
        }
        return res.status(200).json({message:"User Updated"})
    }catch(err){
        console.log(err);
        return res.status(500).json({message:"Update Error"})
    }

}
exports.deleteMusicUsers = async (req, res) => {
    try {
        const { id } = req.params;
        const del = await User.findByIdAndDelete(id);
        if (!del) {
            return res.status(404).json({ message: "User Not Found" });
        }
        return res.status(200).json({ message: "Document Deleted" });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Error Deleting" });
    }
};
exports.getAnalytics = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        
        // Count total songs from the songs array in Music
        const totalSongsData = await Music.aggregate([
            {
                $project: {
                    songCount: { $size: '$songs' } // Count the number of songs in the songs array
                }
            },
            {
                $group: {
                    _id: null,
                    totalSongs: { $sum: '$songCount' } // Sum up all the song counts
                }
            }
        ]);

        const totalSongs = totalSongsData.length > 0 ? totalSongsData[0].totalSongs : 0;

        const recentlyPlayedUsers = await User.aggregate([
            {
                $lookup: {
                    from: 'musics', 
                    localField: '_id',
                    foreignField: 'email',
                    as: 'recentlyPlayed'
                }
            },
            {
                $project: {
                    name: 1,
                    email: 1,
                    recentlyPlayedCount: { $size: '$recentlyPlayed' }
                }
            }
        ]);

        const analyticsData = {
            totalUsers,
            totalSongs,
            recentlyPlayedUsers
        };

        res.status(200).json(analyticsData);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching analytics data" });
    }
}
