var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
const User = require("../models/user");
const Event = require("../models/event");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const { isLength } = require('lodash');

exports.signout = (req,res)=>{
    res.clearCookie("token");//due to cookie parser we can delete the cookie
    res.json({
        message:"User signout successful"
    });
}

exports.signup = (req, res)=>{
   
    console.log(req.body);
    const user =  new User(req.body)
    
    user.save((err,user)=>{
      if(err  ){
          console.log("Error "+err);
          return res.status(400).json({
              error:err

          })
      }
      res.json({
        name:user.name,
        lastname:user.lastname,
        role:user.role,
        email:user.email,
        id:user._id,
        events_created:user.events_created
      });

      console.log("User Creation successful");
    })
}

exports.login = (req, res)=>{
    const {email,password} = req.body;//destructure the data
   
    User.findOne({email},(err,user)=>{
         if(err || !user){
            
             return res.status(400).json({
                 error:"USER EMAIL ID DOES NOT EXIST"
             })
         }
         if(!user.authenticate(password)){
             
            return res.status(400).json({ 
                error:"PASSWORD DOES NOT MATCH"
            }) 
         }
         //create token
           const token = jwt.sign({_id:user._id},process.env.SECRET);
         //put token in cookie
           res.cookie("token",token,{expire: new Date()+9999});
        
           //send reponse to front end
           const {_id,name,email,role,lastname,events_created}= user;
           //console.log(user);
           return res.json({token,user:{_id,name,email,role,lastname,events_created}});


    })

}

//protected route


//Initialize the constructor
exports.isSignedIn = expressJwt({
    secret: process.env.SECRET,
    algorithms: ['HS256'] ,  //algorithm required
    userProperty:"auth"

});

//custom middlewares
let user=null;
exports.isAuthenticated = (req,res,next)=>{
    
    
    //profile is setted in front-end
    
    let check = req.profile && req.auth && req.profile._id == req.auth._id;
    if(!check){
        return res.status(403).json({
            message:"Not Authenticated" 
        })
    }
    user=req.auth;
    
    next();
}

exports.isAdmin = (req,res,next)=>{
    
    if(req.auth.role === 0){
        return res.status(403).json({
            message:"You are not admin"
        })
    }

    next();
}

//Event auth Routes

exports.createEvent = (req,res,next)=>{
    
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;   //keep jpeg or png extensions
    
    
    form.parse(req,(err,field,file)=>{
        console.log(field.userId);
        if(err){
            return res.status(400).json({
                error:"problem with image"
            });
        }
        
        //TODO: restrictions on field
        let event = new Event(field);

        //handle file here
        if(file.photo){
            if(file.photo.size> 5000000){
                return res.status(400).json({
                    error:"Photo size is too big"
                })
            }
            event.photo.data = fs.readFileSync(file.photo.path);
            event.photo.contentType = file.photo.type;
        }
        //save into DB
        event.save((err,event)=>{
            if(err || !event){
                return res.status(400).json({
                    error:err+"Not able to save event in DB"
                })
            }
            console.log("Event Creation Successful",event._id);
            
            res.json(event);
            
            User.findById(req.profile._id).exec((err,user)=>{
                if(err || !user){
                    return res.status(403).json({
                        error:"No user found in DB"
                    })
                }
               
                
                let arr=user.events_created;
                
                let length = arr.length;
                arr[length]=event._id;
               
                User.findOneAndUpdate({"_id":user._id},{"events_created":arr},
                    (err,user)=>{
                     if(err){
                         return res.status(403).json({
                             error:"User Found but not able to update the events_created array"
                         })
                     }
                    
                })
            })
        })
    }); 
     
}



