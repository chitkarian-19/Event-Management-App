import React from "react";
import Menu from "./Menu";
import {Link} from "react-router-dom"
import { Footer } from "./Footer";

const style={
    borderRadius:"20px"
    
}
const Base =({
    title="Event Management App",
    description="Manage all your events",
    className="bg-dark text-white p4"
})=>(
    <div>
        <Menu history={"/"} / >
        <div className="container-fluid">
          <div className="jumbotron bg-dark text-white text-center">
              <h2 className="display-4">{title}</h2>
              <p className="lead">{description}</p>
              
          </div>
          <div className="row">
              <div className="col-sm-4">

              </div>
              <div className="col-sm-4">
          
               <Link className="btn btn-info btn-block" to="/watch" style={{borderRadius:"20px",height:"50px",fontSize:"25px"}} ><strong>Watch Events</strong>
               </Link>
               <br/>
               <Link className="btn btn-warning btn-block" to="/login" style={{borderRadius:"20px",height:"50px",fontSize:"25px"}}><strong>Login</strong></Link>
               <br/>
               <Link className="btn btn-danger btn-block" to="/signup" style={{borderRadius:"20px",height:"50px",fontSize:"25px"}}><strong>SignUp</strong></Link>
               <br/>
              
         
          </div>
             <div className="col-sm-4">
                 </div>
         </div>
        </div>
          <Footer/>       
    </div>
);

export default Base

