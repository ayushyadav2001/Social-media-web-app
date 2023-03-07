const express=require("express");
const router=express.Router();
const mongoose=require("mongoose");
const UserModel=mongoose.model("UserModel")
const bcryptjs =require("bcryptjs")
const jwt=require("jsonwebtoken");
const {JWT_SECRET}=require("../config")

router.post("/signup",(req,res)=>{
    const {fullName,email,password,profileImg,phone}=req.body;
    if(!fullName || !email || !password ||!phone){
        return res.status(400).json({error:"one or more fields are empty"});
    }
    UserModel.findOne({email:email})
    .then((userInDb)=>{
        if(userInDb){
        return res.status(500).json({error:"User already exisit"});

        }
       bcryptjs.hash(password,16)
       .then((hashedPassword)=>{
        const user= new UserModel({fullName,email,password:hashedPassword,phone,profileImg});
        user.save()
        .then((newUser)=>{
            res.status(201).json({result:"User Signup Successfully !"});

        })
        .catch((err)=>{
            console.log(err);
           })

       })
       .catch((err)=>{
        console.log(err);
       })
        

    })
    .catch((err)=>{
        console.log(err);
    })
})

//  Login 


router.post("/login",(req,res)=>{
    const {email,password}=req.body;
    if(!email || !password){
        return res.status(400).json({error:"one or more fields are empty"});
    }
    UserModel.findOne({email:email})
    .then((userInDb)=>{
        if(!userInDb){
        return res.status(401).json({error:"Invalid Credentials"});

        }
       bcryptjs.compare(password,userInDb.password)
       .then((didMatched)=>{
        if(didMatched){
            
            const jwtToken=jwt.sign({_id:userInDb._id},JWT_SECRET);
            const userInfo={"_id":userInDb._id  ,"email":userInDb.email,"fullName":userInDb.fullName}
            // const userInfo = { "_id": userInDb._id, "email": userInDb.email, "fullName": userInDb.fullName };
            res.status(200).json({result:{token:jwtToken,user:userInfo}});
        }
        else{
            return res.status(401).json({error:"Invalid Credentials"});
        }
        

       })
       .catch((err)=>{
        console.log(err);
       })
        

    })
    .catch((err)=>{
        console.log(err);
    })
})
module.exports=router
