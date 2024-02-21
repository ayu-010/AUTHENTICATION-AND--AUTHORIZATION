const User=require("../models/user");
const bcrypt=require("bcrypt");


exports.SignUp= async(req,res) =>
{
    try{
   
        const{name,email,password,role}=req.body;

        if(!email || !password || !name)
        {
            return res.status(201).json({
                sucess:false,
                message:"fill details carefully",

            });
        }


        const alreadyExist= await User.findOne({email});

        if(alreadyExist)
        {
            return res.status(400).json({
                sucess:false,
                message:"already exist user",

            });
        }

        // already exist nahi h toh toh password ko hashed kar do 
  
        let hashedPassword;
        try{
             hashedPassword= await bcrypt.hash(password,10)

            }

        
        catch(err)

        {
            return res.status(500).json({
                sucess:true,
                message:"something went wrong while hashing",

            });
        }

    

        //  hashd karne ke baad uski entry db me kar do

        const newUser= await User.create({name,email,password:hashedPassword,role})


          return res.status(200).json({
            sucess:true,
            message:"user created sucessfully"
          });}

    catch(error)
    {
            console.log(error);

        return res.status(500).json({
            sucess:false,
            message:"something went wrong"
          });

    }
}