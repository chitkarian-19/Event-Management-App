import React,{useEffect, useState}from "react"
import { createEvent, isAuthenticated } from "../auth/helper"
import { Footer } from "../core/Footer"
import Menu from "../core/Menu"
import './Event.css'

const inputStyle ={
     borderRadius:"20px",
     height:"40px"
}

const EventCreation =()=>{
    
    
    const[values,setValues]=useState({
        eventName:"",
        state:"",
        address:"",
        hostName:"",
        emailId:"",
        mobileNo:"",
        date:"2020-07-23",
        description:"",
        photo:"",
        error:"",
        success:"",
        formData:"",
        eventError:"",
        stateError:"",
        addressError:"",
        mobileError:"",
        dateError:"",
        photoError:"",
        descriptionError:""

    });
    
    const {user,token}=isAuthenticated();
     
    const preload= ()=>{
        setValues({
            ...values,
            formData: new FormData()
        })
    }

    useEffect(()=>{
        preload();
    },[])

     const {eventName,
           state,
           address,
           hostName,
           emailId,
           mobileNo,
           date,
           photo,
           formData,
           description,
           error,
           success,
           eventError,
           stateError,
           addressError,
           mobileError,
           dateError,
           photoError,
           descriptionError}=values;

     const handleChange= name=>event=>{
            
            const value = name === "photo"? event.target.files[0]:event.target.value;
            formData.set(name,value);
            setValues({...values,[name]:value});
            
             if(name ==='eventName' ){
                  if(event.target.value.length===0)
                   setValues({
                        ...values,
                        eventError:true,
                        eventName:""
                    })
                  else{
                    setValues({
                        ...values,
                        eventError:false,
                        eventName:event.target.value
                    })
                  }
             }
             else if(name ==='state' ){
                 if(event.target.value.length===0){
                  setValues({
                    ...values,
                    stateError:true,
                    state:""
                   })
                }
                else{
                    setValues({
                        ...values,
                        stateError:false,
                        state:event.target.value
                       })
                }
             }
             else if(name === 'address' )
            { 
                if(event.target.value.length===0)
                {
                   setValues({
                    ...values,
                    addressError:true,
                    address:event.target.value
                   })
                }
                else{
                    setValues({
                        ...values,
                        addressError:false,
                        address:event.target.value
                       })
                }
            }
             else if(name === 'mobileNo'){
                
              if(event.target.value.length<10 ||event.target.value.length>10 ){
                  
                setValues({
                    ...values,
                    mobileError:true,
                    mobileNo:event.target.value
                   })
               }
               else{
                setValues({
                    ...values,
                    mobileError:false,
                    mobileNo:event.target.value
                   }) 
               }
              }
         else if(name ==='description'){
                if (event.target.value.length<100||event.target.value.length>400){
                    setValues({
                        ...values,
                        descriptionError:true,
                        description:event.target.value
                       })
                    }
                else{
                    setValues({
                        ...values,
                        descriptionError:false,
                        description:event.target.value
                       })
                }
            }
             else if(name==='photo'){
                 if(![name]){
                     setValues({
                        ...values,
                        [name]:"",
                        photoError:true
                     })
                 }
                 else{
                    setValues({
                        ...values,
                        [name]:event.target.files[0],
                        photoError:false
                     })
                 }
             }
               
             
            

     }

     const onSubmit =(event)=>{
           
           
           event.preventDefault();
           formData.set("date",date);
           formData.set("hostName",user.name+" "+user.lastname );
           formData.set("emailId",user.email);
           formData.set("userId",user._id);
           if(eventName.length===0||state.length===0||description.length===0||address.length===0||mobileNo.length===0){
               //no action performed
           }
        else if(!photo){
               alert("Select a photo");
           }
        else if(!eventError&&!stateError&&!descriptionError&&!addressError&&!mobileError){

           createEvent(formData,user._id,token)
           .then(data=>{
               if(data.error){
                console.log(data);
                setValues({
                    ...values,
                    error:data.error
                  })
               }
               else{
                   alert("New Event Created");
                   setValues({
                    ...values,
                    eventName:"",
                    state:"",
                    address:"",
                    hostName:"",
                    emailId:"",
                    mobileNo:"",
                    date:"",
                    description:"",
                    photo:"",
                    error:"",
                    success:true
                   })
               }
           })
           .catch(err=>{
               console.log(err)
           })
        }
     }

    
    const successMessage = ()=>{
        return(
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
         <div
         className="alert-success alert"
         style={{display:success?"":"none",marginTop:"20px"}}
        >
          <h4 className="text-center text-lg">New Event Created</h4>
          
        </div>
        </div>
        </div>
        );
    }
  
    const errorMessage = ()=>{
      return(
          <div className="row">
          <div className="col-md-6 offset-sm-3 text-left">
      <div
      className="alert-danger alert"
      style={{display:error?"":"none",marginTop:"20px"}}
      >
       
       <h4 className="text-center text-lg">Not able to create Event </h4>
       
        
      </div>
      
      </div>
      </div>
     
      );
  }




    return(
       <div >
         <Menu/>
         
         <div className="jumbotron bg-dark text-white text-center">
                   <h1>Event Creation Form</h1>
         </div>
         {errorMessage()}
         {successMessage()}
         <div className="row">
             <div className="col-2">

             </div>
             <div className="col-9 border border-warning rounded">
                 <div style={{padding:"20px"}} >
                  <form className="form-horizontal" >
                     <div className="form-group">
                         <label className="control-label col-sm-3 text-white lead font-weight-bold text-underline text-center" ><h3><u>Event Name</u>:</h3></label>
                         <input type="text" style={inputStyle} className="fom-control col-sm-9 autofocus" placeholder="Event Name" value={eventName} onChange={handleChange("eventName")} required/>
                         <p style={{display:eventError?"":"none"}}className="text-danger text-right text-lg">*Event name required</p>
                     </div>
                     <div className="form-group">
                         <label className="control-label col-sm-3 text-white lead font-weight-bold text-underline text-center" ><h3><u>State</u>:</h3></label>
                         <input type="text" style={inputStyle} className="fom-control col-sm-9 autofocus" placeholder="State" value={state} onChange={handleChange("state")}  required/>
                         <p style={{display:stateError?"":"none"}}className="text-danger text-right text-lg">*State name required</p>
                     </div>
                     <div className="form-group">
                         <label className="control-label col-sm-3 text-white lead font-weight-bold text-underline text-center" ><h3><u>Address</u>:</h3></label>
                         <input type="text" style={inputStyle} className="fom-control col-sm-9 autofocus" placeholder="K2 Colony, Hyderabad" onChange={handleChange("address")} value={address} required/>
                         <p style={{display:addressError?"":"none"}}className="text-danger text-right text-lg">*Address field required</p>
                     </div>
                     <div className="form-group">
                         <label className="control-label col-sm-3 text-white lead font-weight-bold text-underline text-center" ><h3><u>Host Name</u>:</h3></label>
                         <input type="text" style={inputStyle} className="fom-control col-sm-9 autofocus  font-weight-bold text-danger" value={user.name+" "+user.lastname} readOnly required/>
                     </div>
                     <div className="form-group">
                         <label className="control-label col-sm-3 text-white lead font-weight-bold text-underline text-center" ><h3><u>Mobile No</u>:</h3></label>
                         <input type="number" style={inputStyle} className="fom-control col-sm-9 autofocus" placeholder="9898939321" onChange={handleChange("mobileNo")} value={mobileNo} required/>
                         <p style={{display:mobileError?"":"none"}}className="text-danger text-right text-lg">*Phone no. required (Length:10)</p>
                     </div>
                     <div className="form-group">
                         <label className="control-label col-sm-3 text-white lead font-weight-bold text-underline text-center" ><h3><u>Date</u>:</h3></label>
                         <input type="date" style={inputStyle} className="fom-control col-sm-9 autofocus" required value={date} onChange={handleChange("date")}/>
                         
                     </div>
                     <div className="form-group">
                         <label className="control-label col-sm-3 text-white lead font-weight-bold text-underline text-center" ><h3><u>Email Id</u>:</h3></label>
                         <input type="email" style={inputStyle} className="fom-control col-sm-9 autofocus text-danger font-weight-bold " value={user.email} readOnly required />
                     </div>
                     <div className="form-group">
                         <label className="control-label col-sm-3 text-white lead font-weight-bold text-underline text-center align-top" ><h3><u>Description</u>:</h3></label>
                         <textarea type="date"  style={{borderRadius:"5px"}} rows="5" className="fom-control col-sm-9 autofocus" maxLength="400" value={description} onChange={handleChange("description")} placeholder="Describe something about the event(Max 400 words only)" required></textarea>
                         <p style={{display:descriptionError?"":"none"}}className="text-danger text-right text-lg">Min 100 and max 400 words required</p>
                     </div>
                         <div className="row">
                          <label className="control-label col-sm-3 text-white lead font-weight-bold text-underline text-center align-top" ><h3><u>Post Photo</u>:</h3></label>
                          <div className="form-group col-sm-9" >
                             <label className="btn btn-muted" style={{borderRadius:"5px"}}>
                             <input
                               type="file"
                               name="photo"
                               accept="image"
                               placeholder="choose a file"
                               className="rounded text-white btn-lg"
                               style={{width:"400px",marginLeft:"-30px"}}
                               required
                               
                               onChange={handleChange("photo")}
                             />

                           </label>
                           <p style={{display:photoError?"":"none"}}className="text-danger text-right text-lg">Photo Required</p>
                         </div>
                       </div>
                       
                       <div className="row">
                           <div className="col-2"></div>
                            <div className="col-10 offset-3">
                             <button className="btn btn-info rounded btn-lg center" onClick={onSubmit} style={{margin:"10px"}} type="submit">Submit</button>
                            </div>
                       </div>
                  </form>
                 </div>
                 
             </div>
             <div className="col-1">

             </div>
         </div>  
         
        
        
         <Footer/>
       </div>
    );
}

export default EventCreation;