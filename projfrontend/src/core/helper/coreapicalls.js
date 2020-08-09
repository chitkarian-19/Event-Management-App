import {API} from "../../backend";

export const getEvents=()=>{
    return fetch(`${API}/events/getAllEvents`,{method:"GET"})
    .then(response=>{
        return response.json();
    })
    .catch(err=>{
        console.log(err);
    })
}


export default getEvents;