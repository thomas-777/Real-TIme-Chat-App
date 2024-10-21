import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";

const useLogin=()=>{
    const[loading,setLoading]=useState(false);
    const {setAuthUser}=useAuthContext()
    const login=async({username,password})=>{
        const success = handleInputError({username,password})
        if(!success){
            return
        }
        setLoading(true)
        try{
            const res=await fetch("http://localhost:5000/api/auth/login",{
                method :"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({username,password}),
                credentials: 'include'
            })

            const data=await res.json();
            if(data.error){
                throw new Error(data.error)
            }
            console.log(data);
            
            localStorage.setItem("userInfo",JSON.stringify(data))
            setAuthUser(data)
        }
        catch(error){
            console.log(error)
        }
        finally{
            setLoading(false)
        }
        
    };
    return{loading,login};
}

export default useLogin;

function handleInputError({username,password}){

    if(!username || !password){
        alert("All fields are required")
        return false
    }
    return true
}