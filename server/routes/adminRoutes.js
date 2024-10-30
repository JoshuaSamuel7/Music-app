const router=require("express").Router();
const passport=require("../config/passportAdmin")
const authControllers=require("../controllers/adminControllers");
router.post("/login",authControllers.login);
router.post("/logout",authControllers.logout)
router.get("/verify",authControllers.verify)
router.post("/create-user",passport.authenticate("admin",{session:false}),authControllers.register);
router.delete("/delete-user",passport.authenticate("admin",{session:false}),authControllers.deleteUsers);
router.get("/get-admin",passport.authenticate("admin",{session:false}),authControllers.getUsers);
router.get("/get-music-users",passport.authenticate("admin",{session:false}),authControllers.getMusicUsers)
router.put("/put-music-users",passport.authenticate("admin",{session:false}),authControllers.putMusicUsers);
router.delete("/delete-music-users/:id",passport.authenticate("admin",{session:false}),authControllers.deleteMusicUsers);
router.get("/get-analytics",authControllers.getAnalytics);
module.exports=router;