import React, { useState } from 'react'
import axios from "axios"
import {Form, FormControl,Button} from "react-bootstrap"
import "../resetpassword/reset.css"
import { useNavigate, useParams } from 'react-router-dom'
function Resetpassword() {
    const {email} = useParams();
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const URL = "http://localhost:5000/login2/reset-password"
    const [password,setpassword] = useState('');
    const handleSubmit = async(e)=>{
            e.preventDefault();
            await axios.post(URL,{
                password:password,
                email:email
            },{
                headers:{
                    "Authorization":`Bearer ${token}`
                }
            }).then(()=>{
                localStorage.removeItem("lock");
                const role = localStorage.getItem("role");
                if(role==="Cashier")
                {
                    navigate("/cashier-dashboard");
                }
                else if(role === "Owner")
                {
                    navigate("/owner-dashboard");
                }
                else if(role === "Manager")
                {
                    navigate("/Manager-dashboard");
                }
                localStorage.removeItem("role");
            })
    }
  return (
    <div className='center-form'>
    <Form onSubmit={handleSubmit}>
        <Form.Group controlId='formBasicEmail'>
            <Form.Label>Enter new password</Form.Label>
            <FormControl className="input" type="password" onChange={(e)=>{setpassword(e.target.value)}} placeholder='' required/>
        </Form.Group>
        <Button variant="dark" type='submit' className='w-100'>
            submit
        </Button>
    </Form>
  </div>
  )
}

export default Resetpassword
