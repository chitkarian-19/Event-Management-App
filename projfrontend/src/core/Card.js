import React,{useState} from "react"
import { Redirect } from "react-router-dom"
import { isAuthenticated } from "../auth/helper"
import ImageHelper from "./helper/ImageHelper"
import ModalForm from "./Modal"
import RegModalForm from "./RegModalForm"

const mystyle2 ={
    position:"relative",
    transition: ".3s" ,
    boxShadow: "10px 20px 20px rgba(0,0,0,0.8)"
}

  
  
const Card = ({event})=>{
    const {user,token} = isAuthenticated();
    const cardTitle = event ? event.eventName :"Event Title";
    const cardDescription = event ? event.description:"Null Description";
    const cardOwner = event ? event.hostName :"Null Owner";
    const emailId = event? event.emailId:"Null Email";
    const state = event? event.state:"Null state";
    const address = event? event.address:"Null Address";
    const date = event?event.date:"Null Date";
    const mobileNo = event?event.mobileNo:"Null Mobile No";
    const email = user?user.email:"null";
    const [visible,setVisibility] = useState(false);
    const [registerVisible ,setRegVisibility] = useState(false);
    const id = event?event._id:"null id"
    const handleRegister = event=>{
        event.preventDefault();
        if(user){
            setRegVisibility(true);
        }
        else{
        
            alert("You need to login first")
            window.location.href="/login"
        }
    }

    return(
        
             
       <div className="card" style={mystyle2}>
           <div className="inner">
               <ImageHelper width="500" height="600"event={event} className="card-img-top rounded float-left "/>
         </div>
        <div >
    <h5 className="card-title">{cardTitle}</h5>
                        
                    <div className="row">
                         <div className="col-sm-6">
                        <button  className="btn btn-block btn-warning " onClick={() => setVisibility(true)} ><strong>Description</strong></button>
                        
                        </div>
                        <div className="col-sm-6">
                        <button  className="btn btn-success btn-block" onClick={
                          handleRegister
                        
                        }><strong>Register</strong></button>
                    </div>
                        
                </div>

                     <div className="row">
                      <div className="col-sm-1"></div>
                      <div className="col-sm-10">
                         { visible && <ModalForm 
                                      cardOwner={cardOwner} 
                                      cardDescription={cardDescription} 
                                      cardTitle={cardTitle}
                                      date={date}
                                      emailId={emailId}
                                      state={state}
                                      address = {address}
                                      mobileNo = {mobileNo}
                                      /> }
                     </div> 
                     <div className="col-sm-1"></div>
                    </div>   
        
                    <div className="row">
                      <div className="col-sm-1"></div>
                      <div className="col-sm-10">
                         { registerVisible && <RegModalForm 
                                       email={email}
                                       id={id}
                                    /> }
                     </div> 
                     <div className="col-sm-1"></div>
                    </div>   

         </div>
        

       </div>
       
    );
}

export default Card;