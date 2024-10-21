import getConversations from "../../hooks/getConversations";
import Conversation from "./Conversation";
import {  Route, Routes, useNavigate } from "react-router-dom";
import MessageContainer from "./messages/MessageContainer";

export default function Conversations(){
    const {loading,conversation}=getConversations();
    const navigate = useNavigate(); 
    const handleNavigate = (userId,fullname) => {
        <Routes><Route path="/messages/:fullname/:id" element={<MessageContainer/>} />;  
        </Routes> 
         navigate(`/messages/${fullname}/${userId}`);
         }
    return (
        <div className="container" style={{ overflowY: "scroll", maxHeight: "320px",width: '480px', height: '400px', backgroundColor: 'black', borderRadius: '10px' }}>
            {
                conversation.map((convo) => (
                    <button
                        key={convo._id} 
                        onClick={() => handleNavigate(convo._id,convo.fullname)}
                        style={{ display: 'container', margin: '8px 0',width: '450px' }} 
                    >
                        {convo.fullname} 
                    </button>
                ))}
        </div>
    );
}