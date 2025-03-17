import React, { useEffect, useState } from 'react'
import axios from "axios"
import "./Cashierdashboard.css"
import {useNavigate} from "react-router-dom"
import Table from 'react-bootstrap/Table';
import { MdOutlineDeleteOutline } from "react-icons/md";
const CashierDashboard = () => {
  const navigate = useNavigate();
  const [cartitems,setcartitems] = useState([]);
  const URL = "http://localhost:5000/product/search-product"
  const [paymenttype,setpaymenttype] = useState('');
  const [barcode,setbarcode] = useState('');
  const [pname,setpname] = useState('');
  const [price,setprice] = useState('');
  const [availablequantity,setavailablequantity] = useState('');
  const [quantity,setquantity] = useState(0);
  var total = quantity*price;
  const [barcodes,setbarcodes] = useState('');
  const totalprice = cartitems.reduce((acc, item) => acc + item.price, 0).toFixed(2);
  const handleSubmit = async(e) =>{
    e.preventDefault();
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
          setquantity(0);
          total = 0;
          setbarcode('');
      })
  }
  function addproduct()
  {
      if(quantity<availablequantity)
      {
        const newProduct = {
          productname:pname,
          quantity:quantity,
          price:total
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
  function navigatepaymentportal()
  {
      if(paymenttype==="Card" && totalprice>0)
      {
          navigate("/payment-portal");
      }
      else{
        alert("error occured ");
      }
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
        <button type='submit' className='barcodebtn'>Submit</button>
        </form>
      </div>
      
      <Table striped style={{ width: '50%', height: '200px', position:"relative",left:'700px' ,top:'-650px'}}>
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
          <td>Paid By:<select onChange={(e)=>{setpaymenttype(e.target.value)}}>
              <option value="Cash">Cash</option>
              <option value="Card">Credit/Debit card</option>
            </select>
          </td>
          <td>Total</td>
          <td>{totalprice}</td>
          <td><button onClick={navigatepaymentportal}className="paybtn" style={{width:"50px",borderRadius:'10px',border:"none",cursor:"pointer"}}>Pay</button></td>
        </tr>
      </tbody>
    </Table>
      </div>
    
  )
}

export default CashierDashboard
