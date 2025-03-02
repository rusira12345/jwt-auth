import Login from "./pages/auth/login/Login"
import Signup from "./pages/auth/Signup/Signup"
import Dashboard from "./pages/dashboard/Dashboard"
import Header from "./pages/header/Header"
import {Routes,Route} from "react-router-dom"
import Home from "./pages/Home/Home"

function App() {
  

  return (
    <div>
        <Header/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Signup/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
        </Routes>
    </div>
  )
}

export default App
