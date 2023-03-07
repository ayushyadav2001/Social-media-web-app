const express=require("express");
const router=express.Router();
const mongoose=require("mongoose");
const PostModel=mongoose.model("PostModel")
const protectedRoute=require('../middleware/protectedResources');

// all users Posts
router.get("/allposts",(req,res)=>{
    PostModel.find()
    .populate("author","_id fullName profileImg")
    .then((dbPosts)=>{

        res.status(200).json({post:dbPosts});
    })
    .catch((error)=>{
        console.log(error)
    })

})

//  Posts from only logeding user
router.get("/myallposts",protectedRoute,(req,res)=>{
    PostModel.find({author:req.user._id})
    .populate("author","_id fullName profileImg")
    .then((dbPosts)=>{

        res.status(200).json({post:dbPosts});
    })
    .catch((error)=>{
        console.log(error)
    })

})
router.post("/createpost",protectedRoute,(req,res)=>{
    const {description,location,image}=req.body;
    if(!description || !location ||!image){
        return res.status(400).json({error:"one or more fields are empty"});
    }
    req.user.password =undefined;
    const postObj=new PostModel({description:description,location:location,image:image,author:req.user});
    postObj.save().then((newPost)=>{
        res.status(201).json({post:newPost});

    })
    .catch((error)=>{
        consolr.log(error);
    })

});

router.delete("/deletepost/:postId",protectedRoute,(req,res)=>{
    PostModel.findOne({_id:req.params.postId})
    .populate("author","_id")
    .exec((error ,postFound)=>{
        if(error || !postFound){
            return res.status(400).json({error:"Post does not exist"});
        }
        if(postFound.author._id.toString()=== req.user._id.toString()){
            postFound.remove()
            .then((data)=>{
                res.status(200).json({result:data});
            })
            .catch((error)=>{
                console.log(error);
            })
        }

    })



});

router.put("/like",protectedRoute,(req,res)=>{
    PostModel.findByIdAndUpdate(req.body.postId,{
        $push:{likes:req.user._id}
    },{
         new :true // return the updated array
    }).populate("author","_id fullName")
    .exec((error,result)=>{
        if(error){
            res.status(400).json({error:error})
        }else{
            res.json(result);
        }
    })

});

// unlike post 
router.put("/unlike", protectedRoute, (req, res) => {
    PostModel.findByIdAndUpdate(req.body.postId, {
        $pull: { likes: req.user._id }
    }, {
        new: true //returns updated record
    }).populate("author", "_id fullName")
        .exec((error, result) => {
            if (error) {
                return res.status(400).json({ error: error });
            } else {
                res.json(result);
            }
        })
});
router.put("/comment", protectedRoute, (req, res) => {

    const comment = { commentText: req.body.commentText, commentedBy: req.user._id }

    PostModel.findByIdAndUpdate(req.body.postId, {
        $push: { comments: comment }
    }, {
        new: true //returns updated record
    }).populate("comments.commentedBy", "_id fullName") //comment owner
        .populate("author", "_id fullName")// post owner
        .exec((error, result) => {
            if (error) {
                return res.status(400).json({ error: error });
            } else {
                res.json(result);
            }
        })
});






module.exports=router