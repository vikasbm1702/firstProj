import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import StaffDashboard from './components/Staff/StaffDashboard';
import AdminDashboard from './components/AdminDashboard';
import NewCustomer from './components/Staff/NewCustomer';
import BillingPage from './components/Staff/BillingPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/new-customer" element={<NewCustomer />} />
        <Route path="/billing" element={<BillingPage />} />
        <Route path="/staff-dashboard" element={<StaffDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
