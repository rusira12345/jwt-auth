import React, {   useEffect, useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import axios from "axios"
import "./Cashierdashboard.css"
import { ToastContainer, toast,Bounce } from 'react-toastify';
import {useNavigate} from "react-router-dom"
import Table from 'react-bootstrap/Table';
import { MdOutlineDeleteOutline } from "react-icons/md";
const CashierDashboard = () => {
  const APIKEY = "d97daff437071769fb004de9";
  const BASE_URL = `https://v6.exchangerate-api.com/v6/${APIKEY}/latest/`
  const convertCurrency = async(from,to,amount) =>
    {
        try{
        const response  = await axios.get(`${BASE_URL}${from}`);
        const rate = response.data.conversion_rates[to];
        if (!rate) {
            console.log(`Exchange rate for ${to} not found.`);
            return;
        }
        var convertedAmount = parseFloat((amount * rate).toFixed(2));
        return convertedAmount;
            }catch(error){
                console.error("Error fetching exchange rate:",error.message);
            }
    }
  const [email,setemail] = useState();
  const navigate = useNavigate();
  const [cartitems,setcartitems] = useState([]);
  const URL = "http://localhost:5000/product/search-product"
  const [paymenttype,setpaymenttype] = useState('Choose Payment type');
  const [barcode,setbarcode] = useState('');
  const [pname,setpname] = useState('');
  const [priceinusd,setpriceinUSd] = useState();
  const [imageURL,setimageURL] = useState('');
  const [price,setprice] = useState('');
  const [availablequantity,setavailablequantity] = useState('');
  const [quantity,setquantity] = useState(1);
  var total = quantity*price;
  const [barcodes,setbarcodes] = useState('');
  const totalprice = parseFloat(cartitems.reduce((acc, item) => acc + item.price, 0).toFixed(2));
  const handleSubmit = async(e) =>{
   
    e.preventDefault();
    if(!barcode)
      {
        toast.error('your barcode is empty', {
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
      }
      else if(isNaN(barcode))
      {
        toast.error('your barcode is not valid', {
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
      }
    else
      {
      const token = localStorage.getItem("token");
      await axios.post(URL,{
        Barcode:barcode
      },{
        headers:{
            "Authorization":`Bearer ${token}`
        }
      }).then((res)=>{
          setbarcodes(res.data.Barcode);
          setpname(res.data.ProductName)
          setprice(res.data.ProductPrice)
          setavailablequantity(res.data.Quantity)
          setimageURL(res.data.pimage)
          async function convertprice ()
          {
            const priceUSD = await convertCurrency("LKR","USD",res.data.ProductPrice)
            setpriceinUSd(priceUSD);
          }
          convertprice();
          setquantity(1);
          total = 0;
          setbarcode('');
      })
    }
  }
  function addproduct()
  {
      if(quantity<availablequantity)
      {
        const newProduct = {
          productname:pname,
          quantity:quantity,
          price:total,
          image:imageURL,
          priceUSD:priceinusd,
          email:email
        }
        setcartitems([...cartitems,newProduct]);
      }
      else{
        alert("Out of stock");
      }
  }
  function deleteitems(deleteindex)
  {
    setcartitems(cartitems.filter((_,index)=>index!==deleteindex));
  }
  const handlesubmitemail =(e)=>{
      e.preventDefault();
      setemail(document.getElementById("emailip").value)
  }
  const makepayment =async() =>
  {
    if(totalprice<=0)
    {
      alert("total price must be greater than zero");
    }
    else if(paymenttype==="Cash") {
      navigate('/payment-cash',{
        state:{
          total:totalprice,
          items:cartitems,
          emails:email
        }
      });
    }
    else if(paymenttype==="Card")
      {
          const stripe = await loadStripe("pk_test_51R4LrYGmCOaBKKe5apGEB8OKcERBIDiP4AjTcNEVgVjeFRqb1b90NCG5su6TscnoSdoSMHYZojc71NPuN92lQb5s00XABMPedZ");
          const token = localStorage.getItem("token");
          const res = await axios.post(`http://localhost:5000/stripes/create-checkout-session`,{
              items:cartitems
          },{
            headers:{
                "Authorization":`Bearer ${token}`
            }
          })
          const session = await res.data;
          const result = await stripe.redirectToCheckout({
            sessionId:session.id
          })
          if(result.error)
          {
            console.log(result.error);
            alert(result.error.message)
          }
      }
      setpaymenttype("Choose Payment type");
  }
  return (
    <div>
      <div className='addproductform'>
        <h1 className='header'>Add Product</h1>
        <div className='barcode'>
        <p>Barcode</p><div className='barcodenumber'>{barcodes}</div>
        </div>
        <div className='productname'>
        <p>Name</p><div className='productnames'>{pname}</div>
        </div>
        <div className='productprice'>
        <p>Price</p><div className='productprices'>{price}</div>
        </div>
        <div className='productquantity'>
        <p>Available Quantity</p><div className='productquantitys'>{availablequantity}</div>
        </div>
        <div className='quantity'>
        <p>Quantity</p><input type="number" value={quantity} onChange={(e)=>{setquantity(e.target.value)}}className='quantitys'></input>
        </div>
        <div className='total'>
        <p>Total</p><div className='totalprice'>{total.toFixed(2)}</div>
        </div>
        <div>
        <button className='addbtn' onClick={addproduct}>Add</button>
        </div>
      </div>
      <div className='barcodeform'>
        <form onSubmit={handleSubmit}>
        <label htmlFor='barcode'>Enter bar code number</label>
        <br/><br/>
        <input type="text" className="inputbarcode" id="barcode" value={barcode} onChange={(e)=>{setbarcode(e.target.value)}}></input>
        <br/><br/>
        <button disabled={!email} type='submit' className='barcodebtn'>Submit</button>
        </form>
      </div>
      <div className='emailform'>
        <form className='formemail' onSubmit={handlesubmitemail}>
          <label>Enter your email</label>
          <br/><br/>
          <input type='email' className='emailinput' id="emailip" required></input>
          <br/><br/>
          <button type="submit" className='emailsubmit'>Submit</button>
        </form>
      </div>
      <Table striped style={{ width: '50%', height: '200px', position:"relative",left:'700px' ,top:'-800px'}}>
      <thead>
        <tr>
          <th colSpan={4} style={{textAlign:"center",fontSize:"30px",color:"green"}}>Freshfare</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Name</td>
          <td>Quantity</td>
          <td>Price</td>
          <td>Action</td>
        </tr>
        {
            cartitems.map((item,index)=>(
              <tr key={index}>
                <td>{item.productname}</td>
                <td>{item.quantity}</td>
                <td>{item.price.toFixed(2)}</td>
                <td><MdOutlineDeleteOutline style={{cursor:"pointer",color:"red"}} onClick={()=>{deleteitems(index)}}/></td>
              </tr>
            ))
        }
        <tr>
          <td>Paid By:<select defaultValue="Choose Payment type" onChange={(e)=>{setpaymenttype(e.target.value)}}>
              <option >Choose Payment type</option>
              <option value="Cash">Cash</option>
              <option value="Card">Credit/Debit card</option>
            </select>
          </td>
          <td>Total</td>
          <td>{totalprice}</td>
          <td><button onClick={makepayment} className="paybtn" style={{width:"50px",borderRadius:'10px',border:"none",cursor:"pointer"}}>Pay</button></td>
        </tr>
      </tbody>
    </Table>
    <ToastContainer/>
      </div>
    
  )
}

export default CashierDashboard
