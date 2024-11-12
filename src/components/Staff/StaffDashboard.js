// src/components/Staff/StaffDashboard.jsx
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaShoppingCart, FaUndo, FaHourglassHalf, FaListAlt, FaUser, FaTag, FaSignOutAlt } from 'react-icons/fa';
import NewCustomer from './NewCustomer';
import BillingPage from './BillingPage';

const StaffDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const staffName = queryParams.get('username') || 'Staff';

  const [activeSection, setActiveSection] = useState(null); // Track the active section

  const handleNewSale = () => setActiveSection('billing');
  const handleReturn = () => alert('Return functionality coming soon!');
  const handleOnHold = () => alert('On Hold functionality coming soon!');
  const handleTransactions = () => alert('Transactions coming soon!');
  const handleCustomers = () => setActiveSection('customer');
  const handleGetPrice = () => alert('Get Price functionality coming soon!');
  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="bg-orange-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">MORE</h1>
        <div className="flex items-center gap-4">
          <p>Welcome, {staffName}</p>
          <button onClick={handleLogout} className="flex items-center">
            <FaSignOutAlt className="mr-2" /> Log Out
          </button>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-4 justify-center">
        <button onClick={handleNewSale} className="p-4 bg-blue-200 rounded-lg"><FaShoppingCart /> New Sale</button>
        <button onClick={handleReturn} className="p-4 bg-blue-200 rounded-lg"><FaUndo /> Return</button>
        <button onClick={handleOnHold} className="p-4 bg-blue-200 rounded-lg"><FaHourglassHalf /> On Hold</button>
        <button onClick={handleTransactions} className="p-4 bg-blue-200 rounded-lg"><FaListAlt /> Transactions</button>
        <button onClick={handleCustomers} className="p-4 bg-blue-200 rounded-lg"><FaUser /> Customers</button>
        <button onClick={handleGetPrice} className="p-4 bg-blue-200 rounded-lg"><FaTag /> Get Price</button>
      </div>

      {/* Conditional rendering based on active section */}
      {activeSection === 'customer' && <NewCustomer onClose={() => setActiveSection(null)} />}
      {activeSection === 'billing' && <BillingPage onClose={() => setActiveSection(null)} />}
    </div>
  );
};

export default StaffDashboard;
