import React, { useState } from 'react'
import axios from "axios"
import {Form, FormControl,Button} from "react-bootstrap"
import "../otp/Otp.css"
import { useNavigate, useParams } from 'react-router-dom'
const Otp = () => {
    const {email} = useParams();
    const url = "http://localhost:5000/login1/verifyotp";
    const navigate = useNavigate();
    const [otp,setotp] = useState('');
    const handleSubmit = async(e) =>{
        e.preventDefault();
        const token = localStorage.getItem("token");
        await axios.post(url,{
            otp:otp
        },{
            headers:{
                "Authorization":`Bearer ${token}`
            }
        }).then(()=>{
            navigate(`/reset-password/${email}`);
        })  
    }
  return (
    <div className='center-form'>
      <Form onSubmit={handleSubmit}>
          <Form.Group controlId='formBasicEmail'>
              <FormControl className="input" type="text" onChange={(e)=>{setotp(e.target.value)}} placeholder='enter OTP' required/>
          </Form.Group>
          <Button variant="dark" type='submit' className='w-100'>
              submit
          </Button>
      </Form>
    </div>
  )
}

export default Otp
