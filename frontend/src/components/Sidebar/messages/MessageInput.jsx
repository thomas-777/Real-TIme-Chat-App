import { useEffect, useState } from "react";
import useSendMessage from "../../../hooks/useSendMessage";
import { useParams } from "react-router-dom";
export default function MessageInput() {
    const [message, setMessage] = useState("");
    const { sendMessage, loading } = useSendMessage();
    const receiverId = useParams().id;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!message || !receiverId) return;

        const newMessage = await sendMessage({ message, receiverId });
        setMessage("");  // Clear the input field
        window.location.reload();
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)} 
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Sending...' : 'Send'}
                </button>
            </form>
        </div>
    );
}