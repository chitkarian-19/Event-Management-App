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

   User.findById(req.params.userId).exec((err,user)=>{
       if(err || !user){
         return res.status(400).json({
             error:"User Not Found"
         })
       }
       
           
           return res.json(user.events_registered_id);
       
   })
}

exports.getCreatedEvents = (req,res)=>{ 
    User.findById(req.params.userId).exec((err,user)=>{
        if(err || !user){
            return res.status(403).json({
                error:"No user found in DB"
            })
        }
        //console.log(user.events_created);
        return res.json(user.events_created);
    });
}

exports.registerEvent = (req,res)=>{
    
    User.findById(req.params.userId).exec((err,user)=>{
        if(err || !user){
            return res.status(403).json({
                error:"No user found in DB"
            })
        }
        let arr = user.events_registered_id;
        if(!(arr.includes(req.params.eventId))){
        let length = arr.length;
        arr[length]= req.params.eventId;

         User.findOneAndUpdate({"_id":user._id},{"events_registered_id":arr},
              (err,user)=>{
                if(err){
                    return res.status(403).json({
                        error:"User Found but not able to update the events_regsitered_id array"
                    })
                }
              }
         
         );
        }
        else{
            console.log("Event Already Registered");
        }

        return res.json(user);
    })
}