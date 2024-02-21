const express=require("express");
const router=express.Router();




const{login}=require("../controllers/Login");
const{SignUp}=require("../controllers/Signup");
const{Auth,isStudent,isAdmin}=require("../middleware/middle");


router.post("/signup",SignUp);
router.post("/login",login);


router.get("/test",Auth,(req,res) =>
{
    res.json({
        sucess:true,
        message:"welecome to the protected route for test "
    });
});


router.get("/student",Auth,isStudent,(req,res) =>
{
    res.json({
        sucess:true,
        message:"welecome to student protected route for student"
    });
});
router.get("/admin",Auth,isAdmin,(req,res) =>
{
    res.json({
        sucess:true,
        message:"welecome to admin protected rout"
    });
});

module.exports=router;