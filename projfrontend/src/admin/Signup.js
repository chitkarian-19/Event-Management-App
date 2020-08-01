import React, { useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { Footer } from "../core/Footer"
import Menu from "../core/Menu"
import {signup} from "../auth/helper"
const Signup = () => {

  const [values,setValues] = useState({
      name:"",
      lastname:"",
      password:"",
      Role:"",
      email:"",
      error:"",
      nameError:false,
      lastNameError:false,
      emailError:false,
      passwordError:false,
      roleError:false,
      success:false
  });

  const {name,
         lastname,
         password,
         email,
         Role,
         success,
         error,
         nameError,
         lastNameError,
         emailError,
         roleError,
         passwordError
        }=values;

  const handleChange =  name=>event=>{
     setValues({...values,error:false,[name]:event.target.value})
     
        if(name === 'name'){
          if(event.target.value.length === 0)
            setValues({
              ...values,
             nameError:true,
             name:""
           })
          else{
            setValues({
              ...values,
             nameError:false,
             name:event.target.value
             
           })
          }
      }
      else if(name === 'lastname'){
        if(event.target.value.length === 0)
          setValues({
            ...values,
           lastNameError:true,
           lastname:""
         })
        else{
          setValues({
            ...values,
           lastNameError:false,
           lastname:event.target.value
           
         })
        }
    }
    else if(name === 'password'){
      if(event.target.value.length < 6)
        setValues({
          ...values,
         passwordError:true,
         password:event.target.value
       })
      else{
        setValues({
          ...values,
         passwordError:false,
         password:event.target.value
         
       })
      }

      
  }
    else if(name === 'email'){
      const emailRegex = RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
       if(emailRegex.test(event.target.value)){
         setValues({
          ...values,
         emailError:false,
         email:event.target.value
        }) 
       }
       else{
        setValues({
          ...values,
         emailError:true,
         email:event.target.value
       }) 
      }
      
    }
   
     
  };
  const onSubmit = (event)=>{
       event.preventDefault();
       //use case to do final check here for inp length 0 and being touched even once
       if(name.length==0||lastname.length==0||email.length==0||password.length==0){
          //no action
       }
      else if((!nameError)&&(!lastNameError)&&(!emailError)&&(!passwordError))
      {
       
       
       let role = parseInt(Role === "Admin"?1:0);
        
       signup({name,lastname,email,password,role})
       .then(data=>{
            if(data.error){
              setValues({
                ...values,
                error:data.error
              })
            }
            else{
              alert("User Successfully Created");
              setValues({
                ...values,
                name:"",
                lastname:"",
                password:"",
                email:"",
                Role:"",
                nameError:false,
                lastNameError:false,
                emailError:false,
                passwordError:false,
                roleError:false,
                error:"",
                success:true
              })
            }
       })
       .catch(err=>{
           console.log(err)
       }
       )
      }
    
  };
   
  const successMessage = ()=>{
      return(
          <div className="row">
              <div className="col-md-6 offset-sm-3 text-left">
      <div
      className="alert-success alert"
      style={{display:success?"":"none",marginTop:"20px"}}
      >
        <h4 className="text-center text-lg">New Account Created, </h4>
        <Link to="/login">Go to Login Page</Link>
        
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
     
     <h4 className="text-center text-lg">User Email Id Already Registered </h4>
     
      
    </div>
    
    </div>
    </div>
   
    );
}

  
  const signUpForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
            <h1 className="text-center text-white">Signup Form</h1>
          <form >
            <div className="form-group">
              <label className="text-light">First Name</label>
              <input value={name} className="form-control" type="text" onChange={handleChange("name")} required/>
              <p style={{display:nameError?"":"none"}}className="text-danger text-right text-lg">*Name field is required</p>
            </div>
            <div className="form-group">
              <label className="text-light">Last Name</label>
              <input value={lastname} className="form-control" type="text" onChange={handleChange("lastname")} required/>
              <p style={{display:lastNameError?"":"none"}}className="text-danger text-right text-lg">*Last Name field is required</p>
            
            </div>
            <div className="form-group">
              <label className="text-light">Email</label>
              <input value={email} className="form-control" type="email" onChange={handleChange("email")} autocomplete="nope" required/>
              <p style={{display:emailError?"":"none"}}className="text-danger text-right text-lg">Invalid Email ID</p>
  
            </div>

            <div className="form-group">
              <label className="text-light">Password</label>
              <input value={password} className="form-control" type="password"onChange={handleChange("password")} required/>
              <p style={{display:passwordError?"":"none"}}className="text-danger text-right text-lg">*Minimum 6 length password is required</p>
            
            </div>
            <div className="form-group">
              
              <label className="text-light" htmlFor="sel1">Role:</label>
                    <select class="form-control" value={Role} onChange={handleChange("Role")}>
                          <option>User</option>
                          <option>Admin</option>
                          
                   </select>
            </div>
            <button type="submit" className="btn btn-success btn-block" onClick= {onSubmit} >Submit</button>
            
          </form>
          <p className="text-danger text-success "><Link to="/login"className="text-danger" >Already having account? Login Here</Link></p>
        </div>
      </div>
    );
  };

  return (
      <div>
        <Menu/>
         {successMessage()}
         {errorMessage()}
         {signUpForm()}
        <Footer/>
     </div>
  );
};

export default Signup;
