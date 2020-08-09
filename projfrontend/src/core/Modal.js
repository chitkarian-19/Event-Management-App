import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Modal, Button,Card } from "react-bootstrap";


function ModalForm(props) {
  const [open, setOpen] = useState(false);
  
  let date = props.date.substring(0,10);
                    

  return (
        
    <> 
      <Button variant="primary " style={{marginTop:"10px"}} className="btn btn-block " onClick={() => setOpen(true)}>
       <strong>Click to View Full Description</strong> 
      </Button>

      <Modal show={open} onHide={() => setOpen(false)} centered scrollable>
        <Modal.Header className="bg-success " closeButton>
          <Modal.Title  className="mx-auto text-lg " style={{marginLeft:"45px",fontSize:"38px"}}>
            {props.cardTitle}
            
          </Modal.Title>
        </Modal.Header>
           <Modal.Body>
            <Card style={{margin:"0.5px",padding:"10px",borderWidth:"3px",borderRadius:"10px"}} className="text-lg text-bold" border="warning">
                <strong >{props.cardDescription}</strong>
                 
             </Card>
             <Card style={{margin:"0.5px",marginTop:"20px",padding:"10px",borderWidth:"3px",borderRadius:"10px"}} className="border-primary">
                <div className="row">
                  <div className="col-sm-4">
                    <strong><u>Host Name:</u></strong>
                    
                  </div>
                  <div className="col-sm-8">
                    {props.cardOwner}
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-4">
                   <strong><u>Address:</u></strong> 
                    
                  </div>
                  <div className="col-sm-8">
                    {props.address}
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-4">
                  <strong><u>State:</u></strong> 
                    
                  </div>
                  <div className="col-sm-8">
                    {props.state}
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-4">
                  <strong><u>Date:</u></strong> 
                    
                  </div>
                  <div className="col-sm-8">
                    { date
                    }
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-4">
                  <strong><u>Email Id:</u></strong> 
                    
                  </div>
                  <div className="col-sm-8">
                    {props.emailId}
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-4">
                  <strong><u>Phone No:</u></strong> 
                    
                  </div>
                  <div className="col-sm-8">
                    {props.mobileNo}
                  </div>
                </div>
             </Card>
         </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setOpen(false)}>
            Close
          </Button>
          <Button variant="primary" >
            Register
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalForm;
