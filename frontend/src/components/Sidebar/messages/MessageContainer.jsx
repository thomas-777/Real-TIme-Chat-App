import MessageInput from "./MessageInput";
import Messages from "./Messages";

export default function MessageContainer(){
    return (
        <div className="container" style={{ width: '450px', height: '400px', backgroundColor: 'black', borderRadius: '10px' }}>
            <div style={{backgroundColor: 'grey',borderRadius: '10px'}}>
                <span>To:</span>
                <span>Thomas</span>
            </div>
            <Messages />
            <MessageInput />
        </div>
    );
}