import { useEffect, useState } from "react";

const useGetMessages=(userid)=>{
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    useEffect(()=>{
        const getMessages=async()=>{
            setLoading(true);
            try {
                const res=await fetch(`http://localhost:5000/api/messages/${userid}`,{
                    credentials:'include'
                })
                const data=await res.json();
                setData(data);
            }      
             catch (error) {
                console.log(error)
            }
            finally{
                setLoading(false);
            }
        }
        getMessages();
    },[userid])
    return {loading,data}
}

export default useGetMessages;
