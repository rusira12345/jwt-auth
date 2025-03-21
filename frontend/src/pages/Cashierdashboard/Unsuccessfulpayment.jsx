import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { ToastContainer, toast,Bounce } from 'react-toastify';
import "./Unsuccessfullpay.css"
import errorimage from "./images/remove.png"
const Unsuccessfulpayment = () => {
    const toastify = () =>{
        toast.error('payment failed', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
            });
    }
    useEffect(()=>{
            toastify()
    },[])
  return (
    <div>
        <img style={{width:'300px',height:'300px',position:"relative" ,top:"160px",left:"560px"}} src={errorimage}></img>
        <p style={{fontSize:"30px",position:"relative",top:"200px",left:"620px"}}>Payment cancel</p>
        <p style={{fontSize:"15px",position:"relative",top:"200px",left:"475px",color:"GrayText"}}>Your payment was unsuccessful. No charges were made. Please try again</p>
        <button className="successbtn"><Link to="/cashier-dashboard" className='btntext'>Go Back to Cashier dashboard</Link></button>
      <ToastContainer />
    </div>
  )
}

export default Unsuccessfulpayment
