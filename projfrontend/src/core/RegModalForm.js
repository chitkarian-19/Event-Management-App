import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Modal, Button,Card } from "react-bootstrap";
import registerEvent from "./helper/registerEvent";
import { isAuthenticated } from "../auth/helper";


function RegModalForm(props) {
  const [open, setOpen] = useState(false);
  const {user,token} = isAuthenticated()
  const eventId= props.id;
  console.log("EventId",eventId);
  const handleSubmit = (event)=>{
      event.preventDefault();
      registerEvent(eventId,token,user._id).then(
        user =>{
          if(!user){
            alert("Not able to register for the event");
          }
          else{
            alert("You have registered for the event")
            console.log(user.events_registered_id);
             
           
          }
        }
      )


  }
                    

  return (
        
    <> 
      <Button variant="danger " style={{marginTop:"10px"}} className="btn btn-block " onClick={() => setOpen(true)}>
       <strong>Click to Register...</strong> 
      </Button>

      <Modal show={open} onHide={() => setOpen(false)} centered scrollable>
        <Modal.Header className="bg-success " closeButton>
          <Modal.Title  className="mx-auto text-lg " style={{marginLeft:"45px",fontSize:"38px"}}>
            Registration Form
          </Modal.Title>
        </Modal.Header>
           <Modal.Body>
           <div className="container">
             
                <form className="form-horizontal" >
    <div className="form-group">
      <label className="control-label col-sm-2 font-weight-bold" for="email">Email:</label>
      <div className="col-sm-10">
        <input type="email" className="form-control font-weight-bold "  name="email" value={props.email} readOnly/>
      </div>
    </div>
    <div className="form-group">
      <label className="control-label col-sm-6 font-weight-bold" for="pwd">No of people:</label>
      <div className="col-sm-10">          
        <input type="number" className="form-control" id="pwd" placeholder="1" name="pwd" default={1} />
      </div>
    </div>
   
    <div className="form-group">        
      <div className="col-sm-offset-2 col-sm-10">
        <button type="submit" class="btn btn-primary" onClick = {handleSubmit}>Submit</button>
      </div>
    </div>
  </form>
</div>
           </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setOpen(false)}>
            Close
          </Button>
          
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default RegModalForm;
