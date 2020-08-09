import React,{useState,useEffect} from "react";
import { isAuthenticated } from "../auth/helper";
import { Footer } from "./Footer";
import getAllUserEvents from "./helper/getAllUserEvents";
import getCreatedEvents from "./helper/getCreatedEvents";
import getEventById from "./helper/getEventById";
import Menu from "./Menu";


const UserDashBoard =()=>{

    const {user,token}=isAuthenticated();
    const [arr,setArray] = useState([]);
    
     
     
    getAllUserEvents(user._id,token)
    .then((events)=>{
        if(events){
            setArray(events);
            
            
        }
    })
    .catch((err)=>{
        console.log(err);
    })

   return(
       <div>
        <Menu/>
        <div className="row">
        <h2 className="text-white text-center display-3" style={{marginLeft:"450px",marginTop:"30px"}}>UserDashBoard</h2>
            <div className="col-sm-2">
                
            </div>
            <div className="col-sm-8">
              
                 <div className="text-lg text-center bg-info " style={{borderRadius:"10px",padding:"20px",marginLeft:"450px"}} ><h3>Registered Events</h3></div>
                 {
               arr.map((e,index)=>{
                   return(
                <div key={index}  className="col-sm-12">
               
                <div className="card bg-warning text-white" style={{margin:"20px",padding:"20px",marginLeft:"470px"}}>
                          <div className="card-body">{e}<br/>
                          <strong className="text-danger">Work Under process....</strong>
                          </div>
                   </div>
                 
                  
                
              </div>
                   );
               })
            }
            </div>
            <div className="col-sm-2">

            </div>
        </div>
        <Footer/>
       </div>
   );


}

export default UserDashBoard;