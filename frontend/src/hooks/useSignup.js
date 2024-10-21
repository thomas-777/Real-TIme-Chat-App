import { useState } from "react"
import { useAuthContext } from "../context/AuthContext"

const useSignup = () => {
    const [loading, setloading] = useState(false)
    const {authUser, setAuthUser } = useAuthContext();
    const signup = async ({ fullname, username, password, confirmpassword }) => {
        const success = handleInputError({ fullname, username, password, confirmpassword })
        if (!success) {
            return
        }
        try {
            const res = await fetch("http://localhost:5000/api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ fullname, username, password, confirmpassword }),
                credentials: 'include'
            })

            const data = await res.json()
            if (data.error) {
                throw new Error(data.error);
            }
            console.log(data)

            localStorage.setItem("userInfo", JSON.stringify(data))
            setAuthUser(data);
            localStorage.setItem("token", data.token);
        } catch (error) {
            console.log(error)
        }
        finally {
            setloading(false)
        }
    };
    return { loading, signup };

}
export default useSignup;

function handleInputError({ fullname, username, password, confirmpassword }) {

    if (!fullname || !username || !password || !confirmpassword) {
        alert("All fields are required")
        return false
    }
    if (password !== confirmpassword) {
        alert("Passwords do not match")
        return false
    }
    // if(password.length < ){
    //     alert("Password must be at least 6 characters long")
    //     return false
    // }
    return true
}