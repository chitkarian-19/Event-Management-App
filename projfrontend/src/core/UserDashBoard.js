import React from "react";
import { Footer } from "./Footer";
import Menu from "./Menu";


const UserDashBoard =()=>{
   return(
       <div>
        <Menu/>
        <h1 className="text-white">UserDashBoard</h1>
        <Footer/>
       </div>
   );


}

export default UserDashBoard;