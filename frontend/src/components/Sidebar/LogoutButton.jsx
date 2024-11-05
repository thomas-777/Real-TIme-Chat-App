import useLogout from "../../hooks/useLogout"

export default function LogoutButton(){
    const {loading,logout} =useLogout();
    return(
        <div>
            <button onClick={() => {
                logout();
            }}>Logout</button>
        </div>
    )
}