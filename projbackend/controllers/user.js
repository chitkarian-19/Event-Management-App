const User = require("../models/user");

exports.getUserById = (req,res,next,id)=>{
    User.findById(id).exec((err,user)=>{
        if(err || !user){
            return res.status(403).json({
                error:"No user found in DB"
            })
        }
       
        req.profile = user;
        next();
    })
}


exports.getUser = (req,res)=>{
    
    req.profile.password=undefined
    return res.json(req.profile);
}


exports.getAllUsers = (req,res)=>{
    
    User.find().exec((err,users)=>{
         if(err || !users){
             return res.status(403).json({
                 error:"No users found"
             })
         }
         res.json(users)
    })
    
}

exports.getAllUserEvents =(req,res)=>{

    return res.json(req.profile.events);
}