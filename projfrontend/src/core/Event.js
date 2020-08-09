import React,{useState,useEffect} from "react"
import Base from "./Base";
import Menu from "./Menu";
import {Footer} from "./Footer"
import './Event.css'
import Card from './Card'
import getEvents from "./helper/coreapicalls";
const mystyle = {
    
    backgroundColor: "#343a40",
    padding: "30px",
    
  };
const mystyle2 ={
    position:"relative",
    transition: ".3s" ,
    boxShadow: "10px 20px 20px rgba(0,0,0,0.8)"
}

const Event = ()=>{
    {
      alert("Wait for a while events are going to load !!!!")
    }
    const [events,setEvents ] = useState([]);
    const [error,setError] = useState();
    const loadAllEvents = ()=>{ 
       getEvents().then(
         data=>{
           if(!data){
             setError(true);
           }
           else{
             setEvents(data);
           }
         }
       )
    }
    useEffect(()=>{
       loadAllEvents();
    },[])
    return(
        <div >
         <Menu/>
         <div className="container-fluid" >
         <div className="container">
          <div className="jumbotron bg-dark text-white text-center">
              <h2 className="display-4">Event List</h2>
             
          </div>
        </div>
         <div class="row text-center ">
          {
            events.map((event,index)=>{
              return(
                 <div key={index}  className="col-sm-4">
                   <div style={mystyle}>
                     
                    <Card event={event} />
                     
                   </div>
                 </div>
              );
            })
          }
             
           
         </div>
         { /*
         <div className="row text-center">
             <div className="col-sm-4 ">
                 <div style={mystyle}>
                  <div className="card " style={mystyle2}>
                    <div className="inner">
                     <img src={require('./group-of-people-1587927.jpg')} className="card-img-top rounded float-left " alt="hola amegos"/>
                     </div>
                     <div >
                        <h5 className="card-title">Event 1</h5>
                        
                        <div className="row">
                         <div className="col-sm-6">
                        <button  className="btn btn-block btn-warning "><strong>Description</strong></button>
                        </div>
                        <div className="col-sm-6">
                        <button  className="btn btn-success btn-block"><strong>Register</strong></button>
                        </div>
                        
                    </div>
                        
                     </div>
                     
                  </div> 
                  </div>
            </div>
            <div className="col-sm-4 ">
                 <div style={mystyle}>
                  <div className="card " style={mystyle2}>
                    <div className="inner">
                     <img src={require('./group-of-people-1587927.jpg')} className="card-img-top rounded float-left " alt="hola amegos"/>
                     </div>
                     <div >
                        <h5 className="card-title">Event 1</h5>
                        
                        <div className="row">
                         <div className="col-sm-6">
                        <button  className="btn btn-block btn-warning "><strong>Description</strong></button>
                        </div>
                        <div className="col-sm-6">
                        <button  className="btn btn-success btn-block"><strong>Register</strong></button>
                        </div>
                        
                    </div>
                        
                     </div>
                     
                  </div> 
                  </div>
            </div>
            <div className="col-sm-4 ">
                 <div style={mystyle}>
                  <div className="card " style={mystyle2}>
                    <div className="inner">
                     <img src={require('./group-of-people-1587927.jpg')} className="card-img-top rounded float-left " alt="hola amegos"/>
                     </div>
                     <div >
                        <h5 className="card-title">Event 1</h5>
                        
                        <div className="row">
                         <div className="col-sm-6">
                        <button  className="btn btn-block btn-warning "><strong>Description</strong></button>
                        </div>
                        <div className="col-sm-6">
                        <button  className="btn btn-success btn-block"><strong>Register</strong></button>
                        </div>
                        
                    </div>
                        
                     </div>
                     
                  </div> 
                  </div>
            </div>
            <div className="col-sm-4 ">
                 <div style={mystyle}>
                  <div className="card " style={mystyle2}>
                    <div className="inner">
                     <img src={require('./group-of-people-1587927.jpg')} className="card-img-top rounded float-left " alt="hola amegos"/>
                     </div>
                     <div >
                        <h5 className="card-title">Event 1</h5>
                        
                        <div className="row">
                         <div className="col-sm-6">
                        <button  className="btn btn-block btn-warning "><strong>Description</strong></button>
                        </div>
                        <div className="col-sm-6">
                        <button  className="btn btn-success btn-block"><strong>Register</strong></button>
                        </div>
                        
                    </div>
                        
                     </div>
                     
                  </div> 
                  </div>
            </div>
            <div className="col-sm-4 ">
                 <div style={mystyle}>
                  <div className="card " style={mystyle2}>
                    <div className="inner">
                     <img src={require('./group-of-people-1587927.jpg')} className="card-img-top rounded float-left " alt="hola amegos"/>
                     </div>
                     <div >
                        <h5 className="card-title">Event 1</h5>
                        
                        <div className="row">
                         <div className="col-sm-6">
                        <button  className="btn btn-block btn-warning "><strong>Description</strong></button>
                        </div>
                        <div className="col-sm-6">
                        <button  className="btn btn-success btn-block"><strong>Register</strong></button>
                        </div>
                        
                    </div>
                        
                     </div>
                     
                  </div> 
                  </div>
            </div>
            
             
            
         </div>*/ }
         </div>
         <Footer/>
        </div>
    );
}

export default Event;