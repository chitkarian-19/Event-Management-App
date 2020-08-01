const Event = require("../models/event");



exports.getEventById = (req,res,next,id)=>{
    
    Event.findById(id).exec((err,_event)=>{
         if(err || !_event){
             return res.status(403).json({
                 error:"No event found on this id"
             })
         }
         req.profile = _event;
         next();
         
    });
}

exports.getEvent = (req,res)=>{

    return res.json(req.profile);
}

exports.getAllCreatedEvents = (req,res)=>{
    return res.json("It is awaited")
}

exports.getAllEvents = (req,res)=>{
    Event.find().exec((err,events)=>{
       
        if(err || !events){
            return res.status(403).json({
                error:"No events found"
            })
        }
        res.json(events)

    });
}


exports.getPhoto = (req,res,next)=>{
    
    if(req.profile.photo.data){
        res.set("Content-type",req.profile.photo.contentType);
        //console.log(req.profile.photo.data);
       return res.send(req.profile.photo.data);
    }
    next();
}