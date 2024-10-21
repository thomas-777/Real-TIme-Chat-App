import { useNavigate } from "react-router-dom";
import useLogout from "../../hooks/useLogout"

export default function LogoutButton(){
    const navigate = useNavigate();
    const {loading,logout} =useLogout();
    return(
        <div>
            <button onClick={() => {
                logout();
            }}>Logout</button>
        </div>
    )
}