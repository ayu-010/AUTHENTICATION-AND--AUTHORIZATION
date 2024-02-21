// const User=require("../models/user");

const JwtToken=require("jsonwebtoken");
require("dotenv").config();


exports.Auth= (req,res,next) =>
{   
    try{
   const {token}=req.body ||req.cookies.token;

   if(!token)
   {
    return res.status(401).json({
        success:false,
        message:"token is missing",
    });
   }


//    verification of token
try{
   let decodedtoken=JwtToken.verify(token,process.env.SECRET_KEY);

   console.log("decode token is ",decodedtoken);
// check it

   req.check=decodedtoken;
   }

catch(error) {
        
    return res.status(401).json({
               success:false,
               message:"token is invalid",
           });
          
   }

   next();
}
catch(error)
{
 return res.status(401).json({
            success:false,
            message:"somethin went wrong while verifying the token",
        });
       
 }

}




exports.isStudent=(req,res,next)=>
{
try{

    if(req.check.role !="Student")
    {
        return res.status(401).json({
            success:false,
            message:" this is a protected route for student",
        });
    }
    next();


}
catch(error)
{
    return res.status(500).json({
        success:false,
        message:"user role is not mathcing",
    });
   }
}




exports.isAdmin=(req,res,next)=>
{
try{

    if(req.check.role !="Admin")
    {
        return res.status(401).json({
            success:false,
            message:" This is a protected route for admin",
        });
    }
    next();


}
catch(error)
{
    return res.status(500).json({
        success:false,
        message:"user role is not mathcing",
    });
   }
}

