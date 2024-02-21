const mongoose=require("mongoose");
require("dotenv").config();

exports.dbconnect = () =>
{
  
    mongoose.connect(process.env.MONGODB_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
  .then( () => console.log("Database in connected sucesssfully"))
  .catch((error) =>
  {
    console.log("Issue in db connection");
    console.error(error.message);
    process.exit(1);
  });
};



 

