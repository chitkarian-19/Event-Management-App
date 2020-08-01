var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
   name:{
       type:String,
       required:true,
       trim:true
   },
   lastname:{
       type:String,
       required:true,
       trim:true
   },
   email:{
       type:String,
       trim:true,
       required:true,
       unique:true,
       dropDups:true
   },
   password:{
       type:String,
       required:true
   },
   role:{
    type:Number,
    default:0,
    required:true
   },
   events_registered_id:{   //the secret code got when registered into event
       type:Array,
       default:[]
   },
   events_created:{   //as an admin create events id
      type:Array,
      default:[]
   },
   events:{   //events registered for 
       type:Array,
       default:[]
   }
})

userSchema.methods = {
     authenticate: function(plainpassword){
             return plainpassword === this.password;
     }
}

module.exports = mongoose.model("User",userSchema);