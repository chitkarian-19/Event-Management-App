require('dotenv').config();


const mongoose = require("mongoose");
const express = require("express");

const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require('cors');

//My routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const eventRoutes = require("./routes/event");

//DB Connection
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
}).then(()=>{
    console.log("DB CONNECTED");
  } 
).catch((err)=>{
    console.log(err); 
});
//Allow updation

mongoose.set('useFindAndModify', false);

//Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
//MyRoutes
app.use("/api",authRoutes);
app.use("/api",userRoutes);
app.use("/api",eventRoutes);

//PORT 
const port=process.env.PORT || 8000;



app.listen(port,()=>{
     console.log(`app is runnning at ${port}`);
})