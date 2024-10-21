import { Link } from "react-router-dom";
import { useState } from "react";
import useLogin from "../../hooks/useLogin";
export default function Login(){
    const [inputs,setInput] = useState({
        username:"",
        password:""
    })
    const {login}=useLogin();
    const handleSubmit = async(e) => {
        e.preventDefault()
        await login(inputs)
    }
    return(
            <div >
            <h1> Login </h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <input type="text" placeholder="Enter username"
                        onChange={(e) => setInput({...inputs, username: e.target.value})}
                    ></input>
                </div>
                <div>
                    <input type='password' placeholder="Enter password"
                        onChange={(e)=>setInput({...inputs,password:e.target.value})}
                    ></input>
                </div>
                <div>
                    <button>Login</button>
                </div>
                <div>
                    <Link to='/signup'>
                        {"Signup"}
                    </Link>
                </div>
                
            </form>
        </div>
    )
}

//Starter Code
// return(
//     <div >
//         <h1> Login </h1>
//         <form>
//             <div>
//                 <input type="text" placeholder="Enter username"></input>
//             </div>
//             <div>
//                 <input type='password' placeholder="Enter password"></input>
//             </div>
//             <div>
//                 <button>Login</button>
//             </div>
//             <div>
//                 <a href="#" >
//                     {"Signup"}
//                 </a>
//             </div>
            
//         </form>
//     </div>
// )