import {API} from "../../backend";

const getAllUserEvents =(userId,token)=>{
    return fetch(`${API}/events/user/${userId}`,
    {
      method:"GET",
      headers:{
        Accept: "application/json",
        Authorization:`Bearer ${token}`
      }
    })
    .then(response=>{
        return response.json();
    })
    .catch(err=>{
        console.log(err);
    })
}

export default getAllUserEvents;