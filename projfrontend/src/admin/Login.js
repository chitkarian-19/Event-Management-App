import React,{useState} from "react"
import { Link,Redirect } from "react-router-dom"
import { login,authenticate,isAuthenticated } from "../auth/helper"
import { Footer } from "../core/Footer"
import Menu from "../core/Menu"
import './Event.css'

const inputStyle ={
     borderRadius:"20px",
     height:"40px"
}

const Login =()=>{
    const [values,setValues] = useState({
        email:"",
        password:"",
        error:"",
        passwordError:"",
        emailError:"",
        success:"",
        loading:false,
        didRedirect:false
    })

    const {user} = isAuthenticated();
    const {email,password,error,emailError,passwordError,success,loading,didRedirect} = values;
    
    const performRedirect = ()=>{
        //:TODO 
        if(didRedirect){
            if(user && user.role ===1 ){
              return <Redirect to="/adminDashboard"/>
             }
            else{
                return <Redirect to="/userDashboard"/> 
            }
        }
        if(isAuthenticated()){
            
           return <Redirect to="/"/>

        }
    }

    const handleChange = name=>event=>{
        setValues({
            ...values,
            error:false,
            [name]:event.target.value
        })

        if(name === 'email'){
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
        else if('password' == name){
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
    }
     const successMessage = ()=>{
         return(
          loading&&(
              <div className="alert alert-info">
                  <h2>Loading...</h2>
              </div>
          )
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
         
         <h4 className="text-center text-lg">Email ID or password not matching to the Database </h4>
         
          
        </div>
        
        </div>
        </div>
       
        );
    }
    const onSubmit = (event)=>{
        event.preventDefault();

        //
        if(email.length==0||password.length==0){
            //no action
         }
         else if((!emailError)&&(!passwordError)){
             login({email,password})
             .then(data=>{
                 console.log(data.token)
                 if(data.error){
                    setValues({
                        ...values,
                        error:data.error
                      })
                 }
                 else{
                    
                     authenticate(data,()=>{
                     setValues({
                         ...values,
                         email:"",
                         password:"",
                         passwordError:"",
                         emailError:"",
                         error:"",
                         success:true,
                         didRedirect:true
                     })
                    })
                 }
             })
             .catch(err=>{
                 console.log("Login ",err);
             })
         }
    }
    

    return(
       <div >
         <Menu/>
         <div className="jumbotron bg-dark text-white text-center">
                   <h1>Login Form</h1>
         </div>
         {performRedirect()}
         {errorMessage()}
         {successMessage()}

         <div className="row">
             <div className="col-2">

             </div>
             <div className="col-9 border border-warning rounded">
                 <div style={{padding:"20px"}} >
                  <form className="form-horizontal" >
                     
                     <div className="form-group">
                         <label className="control-label col-sm-3 text-white lead font-weight-bold text-underline text-center" ><h3><u>Email Id</u>:</h3></label>
                         <input type="email" style={inputStyle} onChange={handleChange("email")} value={email} className="fom-control col-sm-9 autofocus" placeholder="s123@gmail.com" required/>
                         <p style={{display:emailError?"":"none"}} className="text-danger text-right text-lg">Enter a valid email id</p>
                     </div>
                     <div className="form-group">
                         <label className="control-label col-sm-3 text-white lead font-weight-bold text-underline text-center" ><h3><u>Password</u>:</h3></label>
                         <input type="password" style={inputStyle} value={password} onChange={handleChange("password")} className="fom-control col-sm-9 autofocus" required/>
                         <p style={{display:passwordError?"":"none"}} className="text-danger text-right text-lg">Password should be atleast 6 in length</p>
                     </div>
                     
                         
                       
                       <div className="row">
                           <div className="col-2"></div>
                            <div className="col-10 offset-3">
                             <button className="btn btn-info rounded btn-lg center" style={{margin:"10px"}} onClick={onSubmit} type="submit">Submit</button>
                             
                            </div>
                            <span style={{marginLeft:"270px"}} ><Link to="/signup" className="text-danger text-lg ">Not have a Account?</Link></span>
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

export default Login;