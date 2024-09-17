const express=require("express");
const router=express.Router();
const upload=require('../config/cloudinary')
const homeControllers=require('../controllers/homeControllers')
const passport=require('../config/passport')
router.get("/protected",homeControllers.getHome)
router.post("/user-songs",passport.authenticate('jwt',{session:false}),homeControllers.getUserSongs)
router.post("/add-songs",passport.authenticate('jwt',{session:false}),upload.fields([{name:'audio',maxCount:10}]),homeControllers.addSongs);
router.delete("/delete-songs",passport.authenticate('jwt',{session:false}),homeControllers.deleteSong);
router.post("/recent",passport.authenticate('jwt',{session:false}),homeControllers.postRecent);
router.post("/grecent",passport.authenticate('jwt',{session:false}),homeControllers.getRecent);

module.exports=router;