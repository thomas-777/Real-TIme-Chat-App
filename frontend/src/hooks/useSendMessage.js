import { useState } from "react";

const useSendMessage = () => {
    const [loading, setLoading] = useState(false);
    const sendMessage =async ({message,receiverId}) => {
        setLoading(true);
        try {
           
            const res = await fetch(`http://localhost:5000/api/messages/send/${receiverId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ message, receiverId }),
                credentials: 'include'
            })
            const data = await res.json()
            if (data.error) {
                throw new Error(data.error);
            }
        } catch (error) {
            console.log(error)
        }
        finally {
            setLoading(false)
        }
    }
    return{sendMessage,loading}
}
export default useSendMessage;