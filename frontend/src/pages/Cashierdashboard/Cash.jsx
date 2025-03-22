import React, { useState } from 'react'
import axios from "axios"
import { useLocation, useNavigate } from 'react-router-dom';
import "./cash.css"
const Cash = () => {
  const navigate = useNavigate();
  const URL = "http://localhost:5000/transaction/add"
  const updateURL = "http://localhost:5000/product/update"
  const location  = useLocation();
    const{total,items,emails} = location.state || {total:0,items:[],emails:""};
    const [amount,setamount] = useState();
    const balance = parseFloat(amount)  - parseFloat(total)  ;
    const handlesubmit = async(e) =>{
        e.preventDefault();
        const token = localStorage.getItem("token");
        await axios.post(URL,{
          TotalPrice:total,
          Customer_payment:amount,
          Balance:`${balance}`,
          email:emails
        },{
          headers:{
              "Authorization":`Bearer ${token}`
          }
        }).then(()=>{
              const updateproducts  = async() =>{
                  await axios.post(updateURL,{
                      items:items
                  },{
                    headers:{
                      "Authorization":`Bearer ${token}`
                  }
                  }).then(()=>{
                    navigate("/payment/successfull");
                  })
              }
              updateproducts();
        }).catch((error)=>{
          console.log(error);
        })
    }
  return (
    <div className='background'>
      
      <form className='cash' onSubmit={handlesubmit}>
         <div> 
         <label>Total price:</label><div className='totalprice'>{total}</div>
        </div>
          <label>customer Payment:</label><input  className="input" type="text" onChange={(e)=>{setamount(e.target.value)}}></input>
          <br/>
          <label className='lbalance'>Balance:</label><div className='balance'>{parseFloat(balance.toFixed(2))}</div>
          <button className='submit' type='submit'>Submit</button>
      </form>
      
    </div>
  )
}

export default Cash
