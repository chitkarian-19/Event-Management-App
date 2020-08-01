import React from "react";
import { isAuthenticated } from "../auth/helper";
import { Footer } from "./Footer";
import Menu from "./Menu";


const AdminDashBoard =()=>{

    const{user:
        {name,email,role}
     } = isAuthenticated();

    const adminLeftSide = ()=>{
        return(
            <div className="col-6">
            <div className="text-lg text-center bg-warning " style={{borderRadius:"10px",padding:"20px"}} ><h3>Created Events</h3></div>
        </div>
        );
    }
    const adminRightSide = ()=>{
        return(
            <div className="col-6">
                <div className="text-lg text-center bg-info " style={{borderRadius:"10px",padding:"20px"}} ><h3>Registered Events</h3></div>
 
            </div>
        )
    }


   return(
       <div>
        <Menu/>
        <h2 className="text-white text-center">AdminDashBoard</h2>
        <p>Manage All your Events Here</p>
        <div className="container">
           <div className="row">
              {adminLeftSide()}
              {adminRightSide()}
          </div>
        </div>
        <Footer/>
       </div>
   );


}

export default AdminDashBoard;