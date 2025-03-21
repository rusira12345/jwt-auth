import React, { useEffect } from 'react'
import { ToastContainer, toast ,Bounce} from 'react-toastify';
import "./Sucessfullpayment.css"
import successimage from "./images/checked.png"
import { Link } from 'react-router-dom';
const SuccessfullPayment = () => {
    const toasting =() =>{
        toast.success('Payment successful', {
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
        toasting();
    },[])
  return (
    <div>
        <img style={{width:'300px',height:'300px',position:"relative" ,top:"160px",left:"560px"}} src={successimage}></img>
        <p style={{fontSize:"30px",position:"relative",top:"200px",left:"620px"}}>Payment done</p>
        <p style={{fontSize:"15px",position:"relative",top:"200px",left:"450px",color:"GrayText"}}>Thank you for your purchase! Your payment has been successfully processed.</p>
        <button className="successbtn"><Link to="/cashier-dashboard" className='btntext'>Go Back to Cashier dashboard</Link></button>
        <ToastContainer />
    </div>
  )
}

export default SuccessfullPayment
