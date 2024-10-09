import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";

export default function Sidebar(){
    return(
        <div>
            <Conversations />
            <LogoutButton />
        </div>
    )
}