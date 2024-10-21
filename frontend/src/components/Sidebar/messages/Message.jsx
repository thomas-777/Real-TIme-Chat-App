import { useParams } from "react-router-dom";
import useGetMessages from "../../../hooks/useGetMessages";
import './Message.css'; // Import a CSS file for additional styling (optional)

export default function Message() {
    const receiverId = useParams().id; // Extract receiverId from the URL params
    const { loading, data } = useGetMessages(receiverId); // Fetch messages for the user

    if (loading) {
        return <div>Loading messages...</div>; // Show a loading indicator
    }

    return (
        <div className="chat-container" style={{overflowY:'scroll',width:'450px', height: '320px', backgroundColor: 'black', borderRadius: '10px' }}>
            {data && data.length > 0 ? (
                data.map((msg) => (
                    <div
                        key={msg._id}
                        className={`chat-message ${msg.receiverId===receiverId ? 'sent' : 'received'}`}
                    >
                        {msg.message} 
                    </div>
                ))
            ) : (
                <p>No messages yet.</p>
            )}
        </div>
    );
}
