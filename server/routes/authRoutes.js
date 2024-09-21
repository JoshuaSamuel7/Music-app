const express=require("express");
const router=express.Router();
const passport=require('../config/passport')
const authControllers=require('../controllers/authControllers');
router.post("/register",authControllers.postRegister);
router.post("/verify-otp",authControllers.verifyOTP);
router.post("/login",authControllers.postLogin);
router.get("/current_user",passport.authenticate('jwt',{session:false}),authControllers.getCurrentUser);
router.get("/logout",passport.authenticate('jwt',{session:false}),authControllers.logoutUser);
module.exports=router;