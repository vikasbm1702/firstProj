// src/components/BillingPage.jsx
import React, { useState } from 'react';

const BillingPage = () => {
  const [items, setItems] = useState([{ description: '', quantity: 1, price: 0, discount: 0 }]);
  const [total, setTotal] = useState(0);
  const [heldItems, setHeldItems] = useState(null);

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    setItems(updatedItems);
    calculateTotal(updatedItems);
  };

  const addItem = () => {
    setItems([...items, { description: '', quantity: 1, price: 0, discount: 0 }]);
  };

  const removeItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
    calculateTotal(updatedItems);
  };

  const calculateTotal = (items) => {
    const totalAmount = items.reduce((acc, item) => {
      const itemTotal = item.quantity * item.price * (1 - item.discount / 100);
      return acc + itemTotal;
    }, 0);
    setTotal(totalAmount);
  };

  const handlePayment = (method) => {
    alert(`Payment completed using ${method}`);
  };

  const handlePrint = () => {
    const originalContents = document.body.innerHTML;
    const printContents = document.getElementById('billing-section').innerHTML;

    // Temporarily replace the body content with the billing section for printing
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload(); // Reload the page to restore original content after printing
  };

  const handleHold = () => {
    setHeldItems(items); // Hold the current items
    alert("Items have been held.");
  };

  return (
    <div className="min-h-screen bg-white text-black p-6" id="billing-section">
      <h2 className="text-3xl font-bold mb-6 text-center">Billing Page</h2>
      
      <div className="flex">
        {/* Left Section: Items List */}
        <div className="w-2/3 bg-gray-100 p-4 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Items</h3>
          
          {/* Header Row */}
          <div className="grid grid-cols-6 gap-2 mb-2 font-semibold text-gray-700">
            <div>Description</div>
            <div>Quantity</div>
            <div>Unit Price</div>
            <div>Discount (%)</div>
            <div>Amount</div>
            <div>Remove</div>
          </div>

          {/* Item Rows */}
          {items.map((item, index) => (
            <div key={index} className="grid grid-cols-6 gap-2 mb-2 items-center">
              <input
                type="text"
                placeholder="Description"
                value={item.description}
                onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                className="border p-2 rounded"
              />
              <input
                type="number"
                placeholder="Quantity"
                value={item.quantity}
                onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value))}
                className="border p-2 rounded"
              />
              <input
                type="number"
                placeholder="Unit Price"
                value={item.price}
                onChange={(e) => handleItemChange(index, 'price', parseFloat(e.target.value))}
                className="border p-2 rounded"
              />
              <input
                type="number"
                placeholder="Discount"
                value={item.discount}
                onChange={(e) => handleItemChange(index, 'discount', parseFloat(e.target.value))}
                className="border p-2 rounded"
              />
              <div className="p-2 text-center">
                ₹{(item.quantity * item.price * (1 - item.discount / 100)).toFixed(2)}
              </div>
              <button onClick={() => removeItem(index)} className="p-2 bg-red-500 text-white rounded">Remove</button>
            </div>
          ))}
          <button onClick={addItem} className="p-2 bg-green-600 text-white rounded mt-4">Add Item</button>
        </div>
        
        {/* Right Section: Summary, Payment Options, and Print/Hold Options */}
        <div className="w-1/3 ml-6 bg-gray-100 p-4 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Summary</h3>
          <div className="mb-4">
            <p>Cart Value: <span className="font-semibold">₹{total.toFixed(2)}</span></p>
            <p>Total Discount: <span className="font-semibold">₹0.00</span></p>
            <p>Final Cart Value: <span className="font-semibold">₹{total.toFixed(2)}</span></p>
            <p>Balance Amount to Pay: <span className="font-semibold">₹{total.toFixed(2)}</span></p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Payment Options:</h3>
            <button onClick={() => handlePayment('Cash')} className="p-2 bg-blue-600 text-white rounded w-full mb-2">Cash</button>
            <button onClick={() => handlePayment('Card')} className="p-2 bg-blue-600 text-white rounded w-full mb-4">Card</button>

            {/* Print and Hold Options */}
            <button onClick={handlePrint} className="p-2 bg-yellow-500 text-white rounded w-full mb-2">Print Bill</button>
            <button onClick={handleHold} className="p-2 bg-purple-600 text-white rounded w-full">Hold</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingPage;
