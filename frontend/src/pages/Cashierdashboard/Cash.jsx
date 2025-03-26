import React, { useState } from 'react'
import axios from "axios"
import { ToastContainer, toast,Bounce } from 'react-toastify';
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
        if(isNaN(amount)|| !amount || amount<0)
        {
            toast.error('Please enter a valid payment amount', {
                      position: "top-center",
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: false,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "light",
                      transition: Bounce,
                      })
            return
        }
        if(amount<total)
        {
          toast.error('Insufficient payment. Please enter a valid amount', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
            })
            return
        }
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
    <div>
      <form className='cash' onSubmit={handlesubmit}>
         <div> 
         <label>Total price:</label><div className='totalprice'>{total}</div>
        </div>
          <label>customer Payment:</label><input  className="input" type="text" onChange={(e)=>{setamount(parseFloat(e.target.value))}}></input>
          <br/>
          <label className='lbalance'>Balance:</label><div className='balance'>{parseFloat(balance.toFixed(2))}</div>
          <button className='submit' type='submit'>Submit</button>
          <ToastContainer/>
      </form>
      
    </div>
  )
}

export default Cash
