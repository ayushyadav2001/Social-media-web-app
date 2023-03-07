const express=require("express");
const mongoose  = require("mongoose");
const app=express();
const {MONGODB_URL}=require("./config")

const PORT=3000;
global.__basedir=__dirname;
const cors=require("cors");
mongoose.connect(MONGODB_URL).catch((error)=>{console.log(error)});
mongoose.connection.on("connected",()=>{
    console.log("DB Connected");
})
mongoose.connection.on("error",(error)=>{
    console.log(error);
})
require("./models/user_model");
require("./models/post_model");
app.use(cors());
app.use(express.json());

require("./models/user_model");
app.use(require("./routes/user_route"))
app.use(require("./routes/post_route"))
app.use(require("./routes/file_route"))



app.listen(PORT,()=>{
    console.log("Server is started");
})