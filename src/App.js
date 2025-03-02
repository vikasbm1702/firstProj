import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import StaffDashboard from './components/Staff/StaffDashboard';
import AdminDashboard from './components/AdminDashboard';
import NewCustomer from './components/Staff/NewCustomer';
import BillingPage from './components/Staff/BillingPage';
import SaleReturn from './components/Staff/SaleReturn';
import Customers from './components/Staff/sales/Customers';
import RetainerInvoices from './components/Staff/sales/RetainerInvoices';
import SalesOrders from './components/Staff/sales/SalesOrders';
import Packages from './components/Staff/sales/Packages';
import Shipments from './components/Staff/sales/Shipments';
import DeliveryChallans from './components/Staff/sales/DeliveryChallans';
import Invoices from './components/Staff/sales/Invoices';
import PaymentsReceived from './components/Staff/sales/PaymentsReceived';
import CreditReturns from './components/Staff/sales/CreditReturns';
import Transactions from './components/Staff/Transactions';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/new-customer" element={<NewCustomer />} />
        <Route path="/billing" element={<BillingPage />} />
        <Route path="/SaleReturn" element={<SaleReturn />} />
        <Route path="/Customers" element={<Customers/>}/>
        <Route path="/Transactions" element={<Transactions/>}/>
        <Route path="/RetainerInvoices" element={<RetainerInvoices/>}/>
        <Route path="/SalesOrders" element={<SalesOrders/>}/>

        <Route path="/Packages" element={<Packages/>}/>
        <Route path="/Shipments" element={<Shipments/>}/>
        <Route path="/DeliveryChallans" element={<DeliveryChallans/>}/>
        <Route path="/Invoices" element={<Invoices/>}/>
        <Route path="/PaymentsReceived " element={<PaymentsReceived/>}/>
        <Route path="/CreditReturns " element={<CreditReturns/>}/>

        <Route path="/staff-dashboard" element={<StaffDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
