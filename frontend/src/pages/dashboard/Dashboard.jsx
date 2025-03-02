import React, { useEffect, useState } from 'react'
import { Container, Row ,Col,Table} from 'react-bootstrap';
import {useNavigate} from "react-router-dom"
import "./Dashboard"
function Dashboard() {
  const URL = "http://localhost:5000/api/users";
  const token = localStorage.getItem("token");
  const [users,setusers] = useState([]);
  const navigate = useNavigate();
  useEffect(()=>{
    const fetchUsers = async()=>{
        try{
            const response = await fetch(URL,{
              headers:{
                Authorization:`Bearer ${token}`
              }
            })
            try{
              const result = await response.json();
              setusers(result);
            }catch(error)
            {
              console.log(error);
            }
        }catch(error)
        {
          console.log(error);
        }
       
      }
      if(token){
        fetchUsers();
      } 
      else
      {
          navigate("/login");
      }
  },[token,navigate])
  return (
    <div>
      <Container>
          <Row>
            <Col>
              <h1>Dashboard</h1>
              <Table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    users.map((user)=>(
                      <tr key={user._id}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                      </tr>
                    ))
                  }
                </tbody>
              </Table>
            </Col>
          </Row>
      </Container>
    </div>
  )
}

export default Dashboard
