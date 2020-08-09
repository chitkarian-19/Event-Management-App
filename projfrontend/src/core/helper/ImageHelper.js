import React from "react"
import { API } from "../../backend";

const ImageHelper= ({event})=>{
    const imageurl = event? `${API}/getPhoto/${event._id}`:`https://images.pexels.com/photos/2542012/pexels-photo-2542012.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500`
    return(
        <div>
          <img src={imageurl}/>
        </div>
   
    )
}

export default ImageHelper;
