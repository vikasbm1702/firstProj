import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaShoppingCart, FaUndo, FaHourglassHalf, FaListAlt, FaUser, FaSignOutAlt, FaCartPlus, FaSearch } from 'react-icons/fa';
import BillingPage from './BillingPage';
import NewCustomer from './NewCustomer';
import SaleReturn from './SaleReturn';
import GetData from './GetData';
import Customers from './sales/Customers'; // Import Customers from the sales folder
import RetainerInvoices from './sales/RetainerInvoices';
import SalesOrders from './sales/SalesOrders';
import Packages from './sales/Packages';
import Shipments from './sales/Shipments';
import DeliveryChallans from './sales/DeliveryChallans';
import Invoices from './sales/Invoices';
import PaymentsReceived from './sales/PaymentsReceived';
import CreditReturns from './sales/CreditReturns';
import Transactions from './Transactions';
import R from './R.png';

const StaffDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const staffName = queryParams.get('username') || 'Staff';
  
  const [transactions, setTransactions] = useState([]);
  const [activeSection, setActiveSection] = useState(null);
  const [heldBills, setHeldBills] = useState([]);
  const [selectedBill, setSelectedBill] = useState(null);
  const [showSalesDropdown, setShowSalesDropdown] = useState(false);

  // Initialize heldBills and transactions from localStorage
  useEffect(() => {
    const savedTransactions = JSON.parse(localStorage.getItem('transactions')) || [];
    const savedHeldBills = JSON.parse(localStorage.getItem('heldBills')) || [];
    setTransactions(savedTransactions);
    setHeldBills(savedHeldBills); // Ensure held bills are loaded from localStorage on component mount
  }, []);

  // Persist heldBills to localStorage whenever they are updated
  useEffect(() => {
    if (heldBills.length > 0) {
      localStorage.setItem('heldBills', JSON.stringify(heldBills));
    }
  }, [heldBills]);

  const handleTransactionRecord = (record) => {
    const updatedTransactions = [...transactions, record];
    setTransactions(updatedTransactions);
    localStorage.setItem('transactions', JSON.stringify(updatedTransactions));
  };

  const handleNewSale = () => {
    setActiveSection('billing');
    setSelectedBill(null);
    setShowSalesDropdown(false);
  };

  const handleReturn = () => {
    setActiveSection('return');
    setShowSalesDropdown(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate('/');
  };

  const handleHoldBill = (bill) => {
    const updatedBills = [...heldBills, bill];
    setHeldBills(updatedBills); // Add new bill to heldBills state
    setActiveSection(null);
  };

  const handleResumeBill = (index) => {
    setSelectedBill(heldBills[index]); // Set the selected bill to the one that is resumed
    setHeldBills(heldBills.filter((_, i) => i !== index)); // Remove it from the heldBills list
    setActiveSection('billing');
  };

  const toggleSalesDropdown = (event) => {
    event.stopPropagation();
    setShowSalesDropdown((prevState) => !prevState);
    setActiveSection(null);
  };

  const handleSalesOptionClick = (section) => {
    setActiveSection(section);
    setShowSalesDropdown(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4" onClick={() => setShowSalesDropdown(false)}>
      <div className="bg-orange-600 text-white h-18 px-4 flex justify-between items-center">
        <div>
          <img src={R} alt="R Logo" className="w-24 h-16 object-contain" />
        </div>
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
        <button onClick={() => setActiveSection('heldBills')} className="p-4 bg-blue-200 rounded-lg"><FaHourglassHalf /> Held Bills</button>
        <button onClick={() => setActiveSection('transactions')} className="p-4 bg-blue-200 rounded-lg"><FaListAlt /> View Transactions</button>
        <button onClick={() => handleSalesOptionClick('newcustomers')} className="p-4 bg-blue-200 rounded-lg"><FaUser /> Customers</button>
        <button onClick={() => setActiveSection('getdata')} className="p-4 bg-blue-200 rounded-lg"><FaSearch /> Get Data</button>
        <button onClick={toggleSalesDropdown} className="p-4 bg-blue-200 rounded-lg flex items-center gap-2"><FaCartPlus /> Sales</button>
      </div>

      {/* Section rendering based on activeSection */}
      {activeSection === 'transactions' && <Transactions onClose={() => setActiveSection(null)} />}
      {activeSection === 'billing' && (
        <BillingPage 
          onTransactionRecord={handleTransactionRecord} 
          onHoldBill={handleHoldBill} 
          heldBill={selectedBill} 
        />
      )}
      {activeSection === 'getdata' && <GetData onClose={() => setActiveSection(null)} />}
      {activeSection === 'return' && <SaleReturn onClose={() => setActiveSection(null)} />}
      {activeSection === 'heldBills' && (
        <div className="mt-6">
          <h3 className="text-xl font-bold mb-4">Held Bills</h3>
          {heldBills.length > 0 ? (
            heldBills.map((bill, index) => (
              <div key={index} className="border p-2 mb-2 rounded">
                <p>Customer: {bill.customerName}</p>
                <p>Total: ₹{bill.total.toFixed(2)}</p>
                <button onClick={() => handleResumeBill(index)} className="mt-2 p-2 bg-green-500 text-white rounded">Resume</button>
              </div>
            ))
          ) : (
            <p>No held bills available.</p>
          )}
        </div>
      )}

      {/* Sales Dropdown with Options */}
      {showSalesDropdown && (
        <div className="absolute bg-[#D8D7D6] text-black p-2 rounded-lg mt-2 w-48 z-50 left-0" onClick={(e) => e.stopPropagation()}>
          <button onClick={() => handleSalesOptionClick('customers')} className="text-left w-full p-2 hover:bg-[#FBFCFC] rounded">Customers</button>
          <button onClick={() => handleSalesOptionClick('retainerInvoices')} className="text-left w-full p-2 hover:bg-[#FBFCFC] rounded">Retainer Invoices</button>
          <button onClick={() => handleSalesOptionClick('salesOrders')} className="text-left w-full p-2 hover:bg-[#FBFCFC] rounded">Sales Orders</button>
          <button onClick={() => handleSalesOptionClick('packages')} className="text-left w-full p-2 hover:bg-[#FBFCFC] rounded">Packages</button>
          <button onClick={() => handleSalesOptionClick('shipments')} className="text-left w-full p-2 hover:bg-[#FBFCFC] rounded">Shipments</button>
          <button onClick={() => handleSalesOptionClick('deliveryChallans')} className="text-left w-full p-2 hover:bg-[#FBFCFC] rounded">Delivery Challans</button>
          <button onClick={() => handleSalesOptionClick('invoices')} className="text-left w-full p-2 hover:bg-[#FBFCFC] rounded">Invoices</button>
          <button onClick={() => handleSalesOptionClick('paymentsReceived')} className="text-left w-full p-2 hover:bg-[#FBFCFC] rounded">Payments Received</button>
          <button onClick={() => handleSalesOptionClick('creditReturns')} className="text-left w-full p-2 hover:bg-[#FBFCFC] rounded">Credit Returns</button>
        </div>
      )}

      {/* Render Customers Component when activeSection is 'customers' */}
      {activeSection === 'customers' && <Customers onClose={() => setActiveSection(null)} />}
      {activeSection === 'newcustomers' && <NewCustomer onClose={() => setActiveSection(null)} />}
    </div>
  );
};

export default StaffDashboard;
