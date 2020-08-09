import React,{useState,useEffect} from "react";
import { isAuthenticated } from "../auth/helper";
import { Footer } from "./Footer";
import getAllUserEvents from "./helper/getAllUserEvents";
import getCreatedEvents from "./helper/getCreatedEvents";
import getEventById from "./helper/getEventById";
import Menu from "./Menu";

var cnt=0;

const AdminDashBoard =()=>{
  
    const {user,token}=isAuthenticated();
    const [arr,setArray] = useState([]);
    const [uarr,setUArray]= useState([]);
    const[registeredEvents,setRegisteredEvents] = useState([]);
     
     
    getAllUserEvents(user._id,token)
    .then((events)=>{
        if(events){
            setUArray(events);
            
            
        }
    })
    .catch((err)=>{
        console.log(err);
    })
    
    getCreatedEvents(user._id,token)
    .then((events)=>{
         if(events){
             setArray(events);
             
         }
    })
    .catch(err=>{
        
    })
    
    const loadAllRegisteredEvents =(arr)=>{
        console.log("Props",arr);
        arr.map((eventId,index)=>{
            
            getEventById(eventId).then((event)=>{
                if(!event)
                { 
                   setRegisteredEvents({
                    ...registeredEvents,
                    registeredEvents:registeredEvents.concat(event)
                  })
                }
                else{
                    console.log("Error");
                }
            })
        })
       
    
    }
    


    








    const adminLeftSide = ()=>{
        return(
            <div >
            <div className="text-lg text-center bg-warning " style={{borderRadius:"10px",padding:"20px"}} ><h3>Created Events</h3></div>
            {  
                
               arr.map((e,index)=>{
                   return(
                <div key={index}  className="col-sm-12">
               

                   <div className="card bg-info text-white" style={{margin:"20px"}}>
                          <div className="card-body">{e}<br/>
                          <strong className="text-danger">Work Under process....</strong>
                          </div>
                   </div>
                 
                  
                
              </div>
                   );
               })
            }
        </div>
        );
    }
    const adminRightSide = ()=>{
        return(
            <div >
                <div className="text-lg text-center bg-info " style={{borderRadius:"10px",padding:"20px"}} ><h3>Registered Events</h3></div>
                {
               uarr.map((e,index)=>{
                   return(
                <div key={index}  className="col-sm-12">
               
                <div className="card bg-success text-white" style={{margin:"20px"}}>
                          <div className="card-body">{e}<br/>
                          <strong className="text-danger">Work Under process....</strong>
                          </div>
                   </div>
                 
                  
                
              </div>
                   );
               })
            }
            </div>
        )
    }


   return(
       <div>
        <Menu/>
        <h2 className="text-white text-center display-3" style={{marginTop:"30px"}}>AdminDashBoard</h2>
        
        <div className="container" style={{marginTop:"40px"}}>
           <div className="row">
               <div className="col-sm-5">
                {adminLeftSide()}
              </div>
              <div class="col-sm-2"></div>
              <div className="col-sm-5">
              {adminRightSide()}
              </div>
          </div>
        </div>
        <Footer/>
       </div>
   );


}

export default AdminDashBoard;