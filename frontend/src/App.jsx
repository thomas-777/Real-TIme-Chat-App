import { useState } from 'react'

import './App.css'
import Login from './pages/login/login'
import Signup from './pages/signup/signup'
import Home from './pages/home/home'
import { Routes,Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './context/AuthContext'
import MessageContainer from './components/Sidebar/messages/MessageContainer'

function App() {
  const [count, setCount] = useState(0)
  const {authUser}=useAuthContext();
  return (
    <>
        <Routes>
            <Route path="/" element={authUser ? <Home/> : <Navigate to={"/login"} />} />
            <Route path="/login" element={authUser ? <Navigate to='/'/> : <Login />} />
            <Route path="/signup" element={authUser ? <Navigate to='/'/> : <Signup />} />
            <Route path="/messages/:fullname/:id" element={<MessageContainer/>} />;  
        </Routes>
    </>
  )
}

export default App
