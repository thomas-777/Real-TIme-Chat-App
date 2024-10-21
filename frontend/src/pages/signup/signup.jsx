import { Link } from "react-router-dom";
import { useState } from 'react'
import useSignup from "../../hooks/useSignup";


export default function Signup(){
    const [inputs, setInput] = useState({
        fullname: "",
        username: "",
        password: "",
        confirmpassword: ""
    })
    const {loading,signup}=useSignup()
    const handleSubmit = async(e) => {
        e.preventDefault()
        await signup(inputs)
    }
    return(
        <div >
            <h1> Signup </h1>
                <form onSubmit={handleSubmit}>
                <div>
                    <input type="text" placeholder="Enter fullname" value={inputs.fullname}
                        onChange={(e) => setInput({...inputs, fullname: e.target.value})}
                    ></input>
                </div>
                <div>
                    <input type="text" placeholder="Enter username" value={inputs.username}
                        onChange={(e) => setInput({...inputs, username: e.target.value})}
                    ></input>
                </div>
                <div>
                    <input type='password' placeholder="Enter password"
                        value={inputs.password}
                        onChange={(e) => setInput({...inputs, password: e.target.value})}
                    ></input>
                </div>
                <div>
                    <input type='password' placeholder="Confirm password"
                        value={inputs.confirmpassword} 
                        onChange={(e) => setInput({...inputs, confirmpassword: e.target.value})}
                    ></input>
                </div>
                <div>
                    <button disabled={loading}>Signup</button>
                </div>
                <div>
                    <Link to="/login" >
                        {"ALready have an account?"}
                    </Link>
                </div>
                
                </form>
            </div>
        )
}


//Starter code
// return(
//     <div >
//         <h1> Signup </h1>
//             <form>
//             <div>
//                 <input type="text" placeholder="Enter fullname"></input>
//             </div>
//             <div>
//                 <input type="text" placeholder="Enter username"></input>
//             </div>
//             <div>
//                 <input type='password' placeholder="Enter password"></input>
//             </div>
//             <div>
//                 <input type='password' placeholder="Confirm password"></input>
//             </div>
//             <div>
//                 <button>Signup</button>
//             </div>
//             <div>
//                 <a href="#" >
//                     {"ALready have an account?"}
//                 </a>
//             </div>
            
//             </form>
//         </div>
//     )
