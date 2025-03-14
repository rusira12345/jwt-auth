import React, { useState } from 'react'
import {Form, FormControl,Button} from "react-bootstrap"
import axios from "axios"
import "../login/login.css"
import {useNavigate,Link} from "react-router-dom"
function Login() {
  const navigate = useNavigate();
  let token;
  const URL = "http://localhost:5000/auth/login";
  const [userdata,setuserdata] = useState({
    email:"",
    password:""
  })
  const handleinput = (e) =>{
      const {name,value} = e.target;
      setuserdata({...userdata,[name]:value})
  }
  const handlesubmit = async(e) =>{
        e.preventDefault();
        try{
        await axios.post(URL,{
          email:userdata.email,
          password:userdata.password
        }).then((res)=>
          {
            const token = res.data.token;
            const role = res.data.role;
            localStorage.setItem("token",token);
            if(role==="Cashier")
            {
              navigate("/cashier-dashboard")
            }else if(role === "Owner")
            {
              navigate("/owner-dashboard")
            }
            else if(role ==="Manager")
            {
              navigate("/Manager-dashboard")
            }
          })
      }catch(error)
      {
        console.log(error);
      }
  }
  return (
    <div className='center-form'>
      <Form onSubmit={handlesubmit}>
          <h1>Login</h1>
          <Form.Group controlId='formBasicEmail'>
              <Form.Label className='inputlabel'>Email address</Form.Label>
              <FormControl type="email" name="email" className='input' onChange={handleinput} placeholder='enter email' required/>
          </Form.Group>
          <Form.Group controlId='formBasicpassword'>
              <Form.Label className='inputlabel'>Password</Form.Label>
              <FormControl type="password" name="password" className='input' onChange={handleinput} placeholder='enter password' required/>
              <Link className='link1' to="/email"><p>Forget Password</p></Link>
          </Form.Group>
          <Button variant="dark" type='submit' className='w-100'>
              login
          </Button>
      </Form>
    </div>
  )
}

export default Login
