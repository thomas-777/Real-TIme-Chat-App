import getConversations from "../../hooks/getConversations";
import {  Route, Routes, useNavigate } from "react-router-dom";
import MessageContainer from "./messages/MessageContainer";
import { useSocketContext } from "../../context/SocketContext";

export default function Conversations(){
    const {loading,conversation}=getConversations();
    const navigate = useNavigate(); 
    const {onlineUsers} =useSocketContext();
    
    const handleNavigate = (userId,fullname) => {
        <Routes><Route path="/messages/:fullname/:id" element={<MessageContainer/>} />;  
        </Routes> 
         navigate(`/messages/${fullname}/${userId}`);
         }
         return (
            <div className="container" 
                style={{ overflowY: "scroll", maxHeight: "320px", width: '480px', height: '400px', backgroundColor: 'black', borderRadius: '10px' }}>
                {
                    conversation.map((convo) => {
                        const isOnline = onlineUsers.includes(convo._id); 
    
                        return (
                            <button
                                key={convo._id}
                                onClick={() => handleNavigate(convo._id, convo.fullname)}
                                style={{ display: 'block', margin: '8px 0', width: '450px', textAlign: 'left' }} // Adjusted 'block' for better display
                            >
                                {convo.fullname} {isOnline && <span style={{ color: 'green' }}>●</span>}
                            </button>
                        );
                    })
                }
            </div>
        );
}