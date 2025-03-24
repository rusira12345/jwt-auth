import Login from "./pages/auth/login/Login"
import Header from "./pages/header/Header"
import {Routes,Route} from "react-router-dom"
import Email from "./pages/email/Email"
import Otp from "./pages/otp/Otp"
import Resetpassword from "./pages/resetpassword/Resetpassword"
import CashierDashboard from "./pages/Cashierdashboard/CashierDashboard"
import OwnerDashboard from "./pages/Ownerdashboard/OwnerDashboard"
import ManagerDashboard from "./pages/managerDashboard/ManagerDashboard"
import AddCashierasOwner from "./pages/Ownerdashboard/addcashier.jsx/AddCashierasOwner"
import AddCashierasmanager from "./pages/managerDashboard/AddCashier.jsx/AddCashierasmanager"
import AddManagerasOwner from "./pages/Ownerdashboard/addManager.jsx/AddManagerasOwner"
import Paymentportal from "./pages/paymentportal/Paymentportal"
import Cash from "./pages/Cashierdashboard/Cash"
import SuccessfullPayment from "./pages/Cashierdashboard/SuccessfullPayment"
import Unsuccessfulpayment from "./pages/Cashierdashboard/Unsuccessfulpayment"
function App() {
  return (
    <div>
        <Header/>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/email" element={<Email/>}/>
          <Route path="/otp/:email" element={<Otp/>}/>
          <Route path="/reset-password/:email" element={<Resetpassword/>}/>
          <Route path="/cashier-dashboard" element={<CashierDashboard/>}/>
          <Route path="/owner-dashboard" element={<OwnerDashboard/>}/>
          <Route path="/Manager-dashboard" element={<ManagerDashboard/>}/>
          <Route path="/owner-cashier" element={<AddCashierasOwner/>}/>
          <Route path="/manager-cashier" element={<AddCashierasmanager/>}/>
          <Route path="/Owner-manager" element={<AddManagerasOwner/>}/>
          <Route path="/payment-portal" element={<Paymentportal/>}></Route>
          <Route path="/payment-cash" element={<Cash/>}></Route>
          <Route path="/payment/successfull" element={<SuccessfullPayment/>}></Route>
          <Route path="/payment/unsuccessfull" element={<Unsuccessfulpayment/>}></Route>
        </Routes>
    </div>
  )
}

export default App
