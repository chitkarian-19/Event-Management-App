import {API} from '../../backend'

const getEventById = (eventId)=>{
   return fetch(`${API}/getEventById/${eventId}`,{
       method:"GET",
       headers:
       {
               Accept:"application/json"
       }
       
   })
   .then(response=>{
       return response.json();
   })
   .catch(err=>{
       console.log(err);
   })
}

export default getEventById;