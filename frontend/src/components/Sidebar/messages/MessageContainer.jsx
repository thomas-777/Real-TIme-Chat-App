import { useParams } from "react-router-dom";
import MessageInput from "./MessageInput";
import Message from "./Message";

export default function MessageContainer(){
    const fullname=useParams().fullname;
    return (
        <div className="container" style={{ width: '450px', height: '400px', backgroundColor: 'black', borderRadius: '10px' }}>
            <div style={{backgroundColor: 'grey',borderRadius: '10px'}}>
                <span>To  :</span>
                <span>{fullname}</span>
            </div>
            <Message/>
            <MessageInput/>
        </div>
    );
}