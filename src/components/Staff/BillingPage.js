// BillingPage.js
import React, { useState, useEffect } from 'react';

const BillingPage = ({ onHoldBill, heldBill, onTransactionRecord }) => {
  const [items, setItems] = useState([{ description: '', quantity: 1, price: 0, discount: 0 }]);
  const [total, setTotal] = useState(0);
  const [customerName, setCustomerName] = useState('');
  const [cartValue, setCartValue] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);

  // Load the held bill data if provided
  useEffect(() => {
    if (heldBill) {
      setItems(heldBill.items);
      setCustomerName(heldBill.customerName);
      setCartValue(heldBill.cartValue);
      setTotalDiscount(heldBill.totalDiscount);
      setTotal(heldBill.total);
    }
  }, [heldBill]);

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
    let cartValue = 0;
    let discountValue = 0;
    const totalAmount = items.reduce((acc, item) => {
      const itemTotal = item.quantity * item.price;
      const discountAmount = itemTotal * (item.discount / 100);
      const finalItemTotal = itemTotal - discountAmount;

      cartValue += itemTotal;
      discountValue += discountAmount;

      return acc + finalItemTotal;
    }, 0);

    setCartValue(cartValue);
    setTotalDiscount(discountValue);
    setTotal(totalAmount);
  };

  const handleHold = () => {
    const billData = {
      items,
      customerName,
      cartValue,
      totalDiscount,
      total,
    };
    onHoldBill(billData); // Send the held bill data to StaffDashboard

    // Reset fields after holding the bill
    setItems([{ description: '', quantity: 1, price: 0, discount: 0 }]);
    setCustomerName('');
    setCartValue(0);
    setTotalDiscount(0);
    setTotal(0);

    alert("Bill held successfully!");
  };

  const handlePayment = (method) => {
    alert(`Payment completed using ${method}`);
  };

  const handlePrint = () => {
    // Generate an 8-digit bill number
    const billNumber = Math.floor(10000000 + Math.random() * 90000000);
  
    // Calculate the total number of items and total quantity
    const totalItems = items.length;
    const totalQuantity = items.reduce((acc, item) => acc + item.quantity, 0);
    const date = new Date();
  
    // Prepare the transaction record
    const transactionRecord = {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString(),
      customerName,
      billNumber,
      totalItems,
      totalQuantity,
      totalAmount: total.toFixed(2)
    };
  
    // Send transaction data to StaffDashboard
    if (onTransactionRecord) onTransactionRecord(transactionRecord);
  
    // Temporarily insert headers, bill number, total items, and total quantity into the print section
    const originalContents = document.body.innerHTML;
    const printContents = `
      <div>
        <h1 class="text-center text-2xl font-bold mb-4">SAVVY SUPPLIES</h1>
        <h2 class="text-center text-2xl font-bold mb-4">Invoice</h2>
        <p>Bill Number: ${billNumber}</p>
        <p>Customer Name: ${customerName}</p>
        <p>Total Items: ${totalItems}</p>
        <p>Total Quantity: ${totalQuantity}</p>
        ${document.getElementById('print-section').innerHTML}
      </div>
    `;
  
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload();
  };
  
  return (
    <div className="min-h-screen bg-white text-black p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Billing Page</h2>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Enter Customer Name"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>

      <div className="flex">
        {/* Left Section: Items List */}
        <div className="w-2/3 bg-gray-100 p-4 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Items</h3>

          <div className="grid grid-cols-6 gap-2 mb-2 font-semibold text-gray-700">
            <div>Description</div>
            <div>Quantity</div>
            <div>Unit Price</div>
            <div>Discount (%)</div>
            <div>Amount</div>
            <div>Remove</div>
          </div>

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

        {/* Right Section: Summary and Payment Options */}
        <div className="w-1/3 ml-6 bg-gray-100 p-4 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Summary</h3>
          <p>Cart Value: ₹{cartValue.toFixed(2)}</p>
          <p>Total Discount: ₹{totalDiscount.toFixed(2)}</p>
          <p>Final Cart Value: ₹{total.toFixed(2)}</p>
          <p>Balance Amount to Pay: ₹{total.toFixed(2)}</p>
          
          <button onClick={() => handlePayment('Cash')} className="p-2 bg-blue-500 text-white rounded w-full mt-4">Cash</button>
          <button onClick={() => handlePayment('Card')} className="p-2 bg-blue-500 text-white rounded w-full mt-2">Card</button>
          <button onClick={handlePrint} className="p-2 bg-yellow-500 text-white rounded w-full mt-2">Print Bill</button>
          <button onClick={handleHold} className="p-2 bg-purple-500 text-white rounded w-full mt-2">Hold</button>
        </div>
      </div>

      {/* Hidden Print Section */}
      <div className="hidden print:block bg-white p-6" id="print-section">
        <table className="w-full border-collapse border border-gray-300 mt-4">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2 text-left">Description</th>
              <th className="border p-2 text-left">Quantity</th>
              <th className="border p-2 text-left">Unit Price</th>
              <th className="border p-2 text-left">Discount (%)</th>
              <th className="border p-2 text-left">Amount</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td className="border p-2">{item.description}</td>
                <td className="border p-2">{item.quantity}</td>
                <td className="border p-2">₹{item.price.toFixed(2)}</td>
                <td className="border p-2">{item.discount}%</td>
                <td className="border p-2">₹{(item.quantity * item.price * (1 - item.discount / 100)).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h3 className="text-right mt-4 font-semibold">Total Amount: ₹{total.toFixed(2)}</h3>
      </div>
    </div>
  );
};

export default BillingPage;
