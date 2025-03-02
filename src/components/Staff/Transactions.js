// Transactions.js
import React, { useEffect, useState } from 'react';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // Load transactions from localStorage when component mounts
    const savedTransactions = JSON.parse(localStorage.getItem('transactions')) || [];
    setTransactions(savedTransactions);
  }, []);

  const handlePrint = (transaction) => {
    // Create an invisible iframe for printing
    const iframe = document.createElement('iframe');
    iframe.style.position = 'absolute';
    iframe.style.width = '0px';
    iframe.style.height = '0px';
    iframe.style.border = 'none';
    document.body.appendChild(iframe);

    const doc = iframe.contentWindow.document;
    doc.open();
    doc.write('<html><head><title>Print Transaction</title></head><body>');
    doc.write('<h3>Transaction Details</h3>');
    doc.write('<p><strong>Date:</strong> ' + transaction.date + '</p>');
    doc.write('<p><strong>Time:</strong> ' + transaction.time + '</p>');
    doc.write('<p><strong>Customer Name:</strong> ' + transaction.customerName + '</p>');
    doc.write('<p><strong>Bill Number:</strong> ' + transaction.billNumber + '</p>');
    doc.write('<p><strong>Total Items:</strong> ' + transaction.totalItems + '</p>');
    doc.write('<p><strong>Total Quantity:</strong> ' + transaction.totalQuantity + '</p>');
    doc.write('<p><strong>Total Amount:</strong> ₹' + transaction.totalAmount + '</p>');
    doc.write('</body></html>');
    doc.close();

    // Trigger print on the iframe
    iframe.contentWindow.print();

    // Remove iframe after printing
    iframe.onload = () => {
      document.body.removeChild(iframe);
    };
  };

  return (
    <div className="mt-6">
      <h3 className="text-xl font-bold mb-4">Transactions</h3>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Date</th>
            <th className="border p-2">Time</th>
            <th className="border p-2">Customer Name</th>
            <th className="border p-2">Bill Number</th>
            <th className="border p-2">Total Items</th>
            <th className="border p-2">Total Quantity</th>
            <th className="border p-2">Total Amount</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={index}>
              <td className="border p-2">{transaction.date}</td>
              <td className="border p-2">{transaction.time}</td>
              <td className="border p-2">{transaction.customerName}</td>
              <td className="border p-2">{transaction.billNumber}</td>
              <td className="border p-2">{transaction.totalItems}</td>
              <td className="border p-2">{transaction.totalQuantity}</td>
              <td className="border p-2">₹{transaction.totalAmount}</td>
              <td className="border p-2">
                <button onClick={() => handlePrint(transaction)} className="bg-blue-500 text-white px-4 py-2 rounded">
                  Print
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Transactions;
