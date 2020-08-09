import {API} from "../../backend";

export const  getCreatedEvents = (userId,token)=>{
    return fetch(`${API}/getCreatedEvents/${userId}`,
    {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization:`Bearer ${token}`
        }
      })
      .then( response=>{
        
        return response.json();
    })
    
}

export default getCreatedEvents;