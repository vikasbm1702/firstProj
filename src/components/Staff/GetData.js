// GetData.js
import React, { useState } from 'react';

const GetData = () => {
  const [barcode, setBarcode] = useState('');
  const [priceInfo, setPriceInfo] = useState('');

  const handleGetPrice = () => {
    // Mock database lookup
    const mockDatabase = {
      '12345': { itemName: 'Apple', price: 60 },
      '67890': { itemName: 'Banana', price: 30 },
      // Add more barcodes and prices as needed
    };

    if (mockDatabase[barcode]) {
      const { itemName, price } = mockDatabase[barcode];
      setPriceInfo(`${itemName} price is ₹${price}`);
    } else {
      setPriceInfo('Item not found.');
    }
  };

  return (
    <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-md flex flex-col items-center">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Get Item Price</h2>
      <input
        type="text"
        value={barcode}
        onChange={(e) => setBarcode(e.target.value)}
        placeholder="Enter barcode"
        className="p-3 border border-gray-300 rounded-lg w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button 
        onClick={handleGetPrice} 
        className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition-all duration-200"
      >
        Get Data
      </button>
      {priceInfo && <p className="mt-4 text-center text-gray-700 font-medium">{priceInfo}</p>}
    </div>
  );
};

export default GetData;
