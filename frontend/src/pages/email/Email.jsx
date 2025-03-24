import React, { useState } from 'react'
import axios from "axios";
import {Form, FormControl,Button} from "react-bootstrap"
import "../email/email.css"
import { useNavigate } from 'react-router-dom';
const Email = () => {
    const loked = true;
    const navigate = useNavigate();
    const url = "http://localhost:5000/login/login-otp-sent";
    const [email,setemail] = useState('');
    const handleSubmit = async(e) =>{
            e.preventDefault();
            await axios.post(url,{
                email:email
            }).then((res)=>{
                const token = res.data.token.token;
                localStorage.setItem("token",token);
                localStorage.setItem("lock",loked);
                const role = res.data.role;
                localStorage.setItem("role",role);
                navigate(`/otp/${email}`);
            })
    }
  return (
    <div className='center-form'>
      <Form onSubmit={handleSubmit}>
          <Form.Group controlId='formBasicEmail'>
              <Form.Label>Enter your email</Form.Label>
              <FormControl className="input" type="email" onChange={(e)=>{setemail(e.target.value)}} placeholder='enter email' required/>
          </Form.Group>
          <Button variant="dark" type='submit' className='w-100'>
              submit
          </Button>
      </Form>
    </div>
  )
}
export default Email

