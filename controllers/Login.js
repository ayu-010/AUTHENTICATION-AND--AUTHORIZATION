const User=require("../models/user");
const bcrypt=require("bcrypt");
const JwtToken=require("jsonwebtoken");
require("dotenv").config();


exports.login = async (req,res) =>{

try{
    
    
    const{email,password}=req.body;

    if(!email || !password )
    {
        return res.status(400).json({
            sucess:false,
            message:"fill details carefully",

        });
    }
  
    
    let alreadyExist= await User.findOne({email});
      
    console.log(alreadyExist);
    


    if(!alreadyExist)
    {   
        
           
    return res.status(401).json({
    sucess:false,
    message:"first go and  sign up",

});
    }

    const payload={
        role:alreadyExist.role,
        name:alreadyExist.name,
        email:alreadyExist.email,
        id:alreadyExist._id,
                 };
    
           
    
    if( await bcrypt.compare(password,alreadyExist.password))
            {  
              // jwt token genrate karna padega yeha pev
            let   token=JwtToken.sign(payload,process.env.SECRET_KEY,{
                expiresIn:"2h"
            });


    
            console.log("token genrated is----",token);

           alreadyExist=alreadyExist.toObject();
           alreadyExist.token=token;
           alreadyExist.password=undefined;


           const options ={
            expiresIn:new Date(Date.now() + 3*24*60*60*1000),
            httpOnly:true,
       }

           res.cookie("token",token,options).status(200).json({
               sucess:true,
             
               token,
               alreadyExist,
               message:"user logged in  sucessfuly",
               
                 
           })
         }


         else{
            // password do not matched
            return res.status(403).json({
                success:false,
                message:"Password Incorrect",
            });
        }
    }

    catch(error)
    {
console.log(error);
return res.status(500).json({
    success:false,
    message:"login failure",
});
    }
}