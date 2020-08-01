import {API} from "../../backend.js"

export const signup = user =>{
    
    return fetch(`${API}/signup`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      })
      .then(response=>{
       
        return response.json();
    })
    .catch(err=>{
        console.log(err+"error is happening");
    })
}

export const login = user =>{
    return fetch(`${API}/login`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json"

        },
        body:JSON.stringify(user)
    })
    .then(response=>{
        
        return response.json();
    })
    .catch(err=>{
        console.log(err)
    })
}

export const authenticate = (data,next)=>{
    if(typeof window !== "undefined"){
        localStorage.setItem("jwt",JSON.stringify(data));
        next();
    }
}

export const signout = next =>{
    if(typeof window !== "undefined"){
        localStorage.removeItem("jwt");
        next();
        return fetch(`${API}/signout`,{
            method:"GET"
        })
        .then((response) => {
            console.log(response.json())
        })
        .catch(err =>{
            console.log(err);
        })
    }
}

export const isAuthenticated = ()=>{
    if(typeof window === "undefined"){
        return false;
    }
    if(localStorage.getItem("jwt")){
        return JSON.parse(localStorage.getItem("jwt"));
    }
    else{
        return false;
    }
};

export const createEvent = (event,userId,token)=>{
    console.log("frontend",event);
    return fetch(`${API}/createEvent/${userId}`,{
         method:"POST",
         headers: {
            Accept:"application/json",
            Authorization: `Bearer ${token}`
          },
          body: event
    })
    .then(response=>{
        console.log(response);
        return response.json();
    })
    .catch(err=>{
        console.log(err+"error is happening");      
    })

}