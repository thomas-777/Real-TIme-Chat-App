import { useState } from "react";
import useSendMessage from "../../../hooks/useSendMessage";
import { useParams } from "react-router-dom";

export default function MessageInput(){
    const [message, setMessage] = useState("");
    const {sendMessage,loading}=useSendMessage();
    const receiverId=useParams().id;
    const handleSubmit = async(e) => {
        e.preventDefault();
        if(!message.trim()) return;
        await sendMessage({message,receiverId});
        console.log("Message sent!");
        setMessage("");
    }
    return(
        <div>
            <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Type a message..."
             value={message}
              onChange={(e)=>setMessage(e.target.value)}/>
            <button>Send</button>
            </form>
        </div>
    )
}