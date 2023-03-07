const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({

    fullName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
        minlength:8
    },
    profileImg:{
        type:String,
        default:"https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
    }

});
mongoose.model("UserModel",userSchema);