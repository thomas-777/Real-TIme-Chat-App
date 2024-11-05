import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import useGetMessages from "../../../hooks/useGetMessages";
import './Message.css';
import { useSocketContext } from "../../../context/SocketContext";
export default function Message() {
    const receiverId = useParams().id;
    if (!receiverId) return;
    const { loading, data: initmessages } = useGetMessages(receiverId);
    const [messages, setMessages] = useState(initmessages || []);
    useEffect(() => {
        setMessages(initmessages);
    }, [initmessages]);
    const chatContainerRef = useRef(null);
    const { socket } = useSocketContext();
    console.log("Initial data", messages)
    useEffect(() => {
        if (!socket) return;
        socket?.on("newMessage", (newMessage) => {
            console.log("New message received", newMessage)
            setMessages((prevMessages) => [...prevMessages, newMessage]);
            console.log("Messages", messages)

        });
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
        return () => {
            socket.off("newMessage");
        };
    }, [socket, messages]);



    if (loading) {
        return <div>Loading messages...</div>;
    }

    return (
        <div
            className="chat-container"
            ref={chatContainerRef}
            style={{ overflowY: 'scroll', width: '450px', height: '320px', backgroundColor: 'black', borderRadius: '10px' }}
        >
            {messages && messages.length > 0 ? (
                messages.map((msg) => (
                    <div
                        key={msg._id}
                        className={`chat-message ${msg.receiverId === receiverId ? 'sent' : 'received'}`}
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
