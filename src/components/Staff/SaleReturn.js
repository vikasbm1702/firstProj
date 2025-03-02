import React, { useState } from 'react';

const SaleReturn = ({ onClose }) => {
  const [customerName, setCustomerName] = useState('');
  const [address, setAddress] = useState('');
  const [product, setProduct] = useState([{ name: '', price: '', quantity: '', total: '' }]);
  const [paidAmount, setPaidAmount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('Cash');
  const [remarks, setRemarks] = useState('');
  const [nonBillRemarks, setNonBillRemarks] = useState('');

  const handleAddRow = () => {
    setProduct([...product, { name: '', price: '', quantity: '', total: '' }]);
  };

  const handleDeleteRow = (index) => {
    const updatedProduct = [...product];
    updatedProduct.splice(index, 1);
    setProduct(updatedProduct);
  };

  const handleProductChange = (index, field, value) => {
    const updatedProduct = [...product];
    updatedProduct[index][field] = value;
    if (field === 'price' || field === 'quantity') {
      updatedProduct[index].total = updatedProduct[index].price * updatedProduct[index].quantity;
    }
    setProduct(updatedProduct);
  };

  const subtotal = product.reduce((acc, item) => acc + Number(item.total || 0), 0);
  const returnAmount = subtotal - paidAmount;

  const handleSubmit = () => {
    alert(`Return amount: ${returnAmount}`);
    onClose();
  };

  // Print function to print only the Return Summary
  const handlePrint = () => {
    const originalContents = document.body.innerHTML;
    const printContents = document.getElementById('print-section').innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload(); // Reload to reset the page after printing
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Sale Return</h2>

        {/* Customer Information */}
        <div className="mb-6">
          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            placeholder="Customer Name"
            className="w-full p-3 border border-gray-300 rounded mb-4"
          />
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Address"
            className="w-full p-3 border border-gray-300 rounded"
          />
        </div>

        {/* Product Table */}
        <div className="overflow-x-auto mb-6">
          <table className="w-full border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-3">#</th>
                <th className="p-3">Product Name</th>
                <th className="p-3">Sale Price</th>
                <th className="p-3">Quantity</th>
                <th className="p-3">Item Total</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {product.map((item, index) => (
                <tr key={index} className="text-center">
                  <td className="p-3">{index + 1}</td>
                  <td>
                    <input
                      type="text"
                      value={item.name}
                      onChange={(e) => handleProductChange(index, 'name', e.target.value)}
                      className="p-2 border border-gray-300 rounded"
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={item.price}
                      onChange={(e) => handleProductChange(index, 'price', Number(e.target.value))}
                      className="p-2 border border-gray-300 rounded"
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleProductChange(index, 'quantity', Number(e.target.value))}
                      className="p-2 border border-gray-300 rounded"
                    />
                  </td>
                  <td>{item.total || 0}</td>
                  <td>
                    <button onClick={() => handleDeleteRow(index)} className="text-red-500">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button onClick={handleAddRow} className="bg-green-500 text-white py-2 px-4 rounded mb-6">
          + Add Row
        </button>

        {/* Order Summary with Customer Info for Printing */}
        <div id="print-section" className="bg-gray-50 p-6 rounded-lg shadow-lg mb-6">
        <h1 className="text-center text-2xl font-bold mb-4">SAVVY SUPPLIES</h1>
          <h3 className="text-xl font-semibold mb-4">Return Summary</h3>
          <div className="mb-4">
            <p><strong>Customer Name:</strong> {customerName}</p>
            <p><strong>Address:</strong> {address}</p>
          </div>
          <table className="w-full border border-gray-200 rounded-lg mb-4">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-3">Product Name</th>
                <th className="p-3">Sale Price</th>
                <th className="p-3">Quantity</th>
                <th className="p-3">Item Total</th>
              </tr>
            </thead>
            <tbody>
              {product.map((item, index) => (
                <tr key={index} className="text-center">
                  <td className="p-3">{item.name}</td>
                  <td className="p-3">{item.price}</td>
                  <td className="p-3">{item.quantity}</td>
                  <td className="p-3">{item.total || 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="space-y-4">
            <div className="flex justify-between">
              <p>Subtotal:</p>
              <p>{subtotal.toFixed(2)}</p>
            </div>
            <div className="flex justify-between">
              <p>Total Paid:</p>
              <p>{paidAmount.toFixed(2)}</p>
            </div>
            <div className="flex justify-between">
              <p>Return Amount:</p>
              <p>{returnAmount.toFixed(2)}</p>
            </div>
          </div>
        </div>

        {/* Print and Submit Buttons */}
        <div className="flex justify-between">
          <button onClick={handlePrint} className="bg-yellow-500 text-white py-3 px-6 rounded">
            Print Return Summary
          </button>
          <button onClick={handleSubmit} className="bg-blue-500 text-white py-3 px-6 rounded">
            Return {returnAmount.toFixed(2)}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SaleReturn;
