const express = require("express");
const app = express();

require("dotenv").config();

const PORT=process.env.PORT  ||5000;

app.use(express.json());

require("./config/database").dbconnect();





const ro=require("./routes/path");
app.use("/api/v1",ro);


app.listen(PORT, (req, res) => {
    console.log (`PORt is running on ${PORT}`);
});

app.get("/", (req, res) => {
    res.send("home page it is ");
});
