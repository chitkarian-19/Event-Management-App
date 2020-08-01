const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
   eventName:{
       type:String,
       trim:true,
       required:true
   },
   state:{
    type:String,
    trim:true,
    required:true
   },
   address:{
       type:String,
       trim:true,
       required:true
   },
   hostName:{
       type:String,
       trim:true,
       required:true,
   },
   emailId:{
    type:String,
    trim:true,
    required:true,
   },
   mobileNo:{
       type:Number,
       trim:true,
       required:true
   },
   date:{
       type:Date,
       trim:true,
       required:true
   },
   description:{
       type:String,
       required:true,
       maxlength:400
   },
   user_registered_event_id:{  //user secret codes
       type:Array,
       default:[]
   },
   photo:{
       data:Buffer,
       contentType:String,
       
   },
   count:{
       type:Number  //count of number of users
   }
},{timestamps:true}) 

eventSchema.methods ={

}

module.exports = mongoose.model("Event",eventSchema);