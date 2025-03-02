import React, { useState } from 'react'
import axios from "axios";
import {useNavigate} from "react-router-dom"
import {Form, FormControl,Button} from "react-bootstrap"
import "./Signup.css"
function Signup() {
  const  navigate = useNavigate();
  const URL="http://localhost:5000/user/register";
  const [userdetails,setuserdetail] = useState({
    email:'',
    name:'',
    password:''
  })
  const handlechange = (e) =>{
    const {name,value} = e.target;
    setuserdetail({...userdetails,[name]:value})
}
 const handleSubmit = async(e)=>{
      e.preventDefault();
      try{
      const response = await axios.post(URL,{
        email:userdetails.email,
        name:userdetails.name,
        password:userdetails.password
      }).then(()=>{navigate("/login")})
      console.log(response.data);
    }catch(error)
    {
      console.log(error);
    }finally{
      setuserdetail({
        email:'',
        name:'',
        password:''
      })
    }

 }
  return (
    <div className='center-form'>
      <Form onSubmit={handleSubmit}>
          <h1>Sign up</h1>
          <Form.Group controlId='formBasicEmail'>
              <Form.Label className='inputlabel'>Email address</Form.Label>
              <FormControl type="email" name="email" className='input' value={userdetails.email} onChange={handlechange} placeholder='enter email' required/>
          </Form.Group>
          <Form.Group controlId='formBasicname'>
              <Form.Label className='inputlabel'>Name</Form.Label>
              <FormControl type="text" name="name" className='input' value={userdetails.name} onChange={handlechange} placeholder='enter name' required/>
          </Form.Group>
          <Form.Group controlId='formBasicpassword'>
              <Form.Label className='inputlabel'>Password</Form.Label>
              <FormControl type="password" name="password" className='input' value={userdetails.password} onChange={handlechange} placeholder='enter password' required/>
          </Form.Group>
          <Button variant="dark" type='submit' className='w-100'>
              Sign up
          </Button>
      </Form>
    </div>
  )
}

export default Signup
