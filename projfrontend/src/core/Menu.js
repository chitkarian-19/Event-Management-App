import React, { Fragment } from 'react'
import {Link,withRouter} from 'react-router-dom'
import { isAuthenticated, signout } from '../auth/helper'

const currentTab = (history,path)=>{
    if(history.location.pathname === path)
    return {color: "#2ecc72"}
    else
    return {color:"#FFFFFF"}
}

const Menu =({history})=>(
    <div>
     <ul className="nav nav-tabs bg-dark">
         <li className="nav-item">
             <Link style={currentTab(history,"/")} className="nav-link" to="/">
                 Home
             </Link>
         </li>
         
         <li className="nav-item">
             <Link style={currentTab(history,"/watch")} className="nav-link" to="/watch">
                 Watch Events
             </Link>
         </li>
         {
             (!isAuthenticated())&&(
                <Fragment>
         <li className="nav-item">
             <Link style={currentTab(history,"/signup")} className="nav-link" to="/signup">
                 Signup
             </Link>
         </li>
         
         <li className="nav-item">
             <Link style={currentTab(history,"/login")} className="nav-link" to="/login">
                 Login
             </Link>
         </li>

         </Fragment>
             )
         }
         { isAuthenticated()&& isAuthenticated().user.role===0
          &&(
          <li>
             <Link style={currentTab(history,"/userDashBoard")} className="nav-link" to="/userDashBoard">
                 U.DashBoard
             </Link>
          </li>
          )
         }
         {
          isAuthenticated()&& isAuthenticated().user.role===1
          &&(  
         <li>
             <Link style={currentTab(history,"/adminDashBoard")} className="nav-link" to="/adminDashBoard">
                 A.DashBoard
             </Link>
         </li>
          )
         }
         <li>
             <Link style={currentTab(history,"/creation")} className="nav-link" to="/creation">
                 Create an Event
             </Link>
         </li>
         <li>
            {
                isAuthenticated() && (
                    <span style={currentTab(history,"/signout")} className="nav-link text-warning" to="/signout"
                          onClick={()=>{
                           signout(()=>{
                             history.push("/");
                           })
                         }

                       }
                    >
                    Signout 
                    </span>
                )
            }
         </li>

     </ul>
    </div>
);

export default withRouter(Menu);