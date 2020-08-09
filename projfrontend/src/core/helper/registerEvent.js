import {API} from "../../backend"

const registerEvent = (eventId,token,userId)=>{
    console.log(token,eventId,userId);
   return fetch(`${API}/registerEvent/${userId}/${eventId}`,{
     method:"POST",
     headers:{
        Accept:"application/json",
        Authorization: `Bearer ${token}`
     },
     body:JSON.stringify(eventId)
    })
   .then(response=>{
      return response.json();
   })
   .catch(err=>{
     console.log(err);
   })
}

export default registerEvent;

/*
  return fetch(`${API}/login`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json"

        },
        body:JSON.stringify(user)
    })
*/ 