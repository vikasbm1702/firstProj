import React, { useState, useEffect } from 'react';

const CustomersSection = () => {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [printCustomer, setPrintCustomer] = useState(null);

  // Fetch customers from API (replace URL with your API endpoint)
  useEffect(() => {
    const fetchCustomers = async () => {
      // Simulate an API call with dummy data
      const data = [
        { id: 1, firstName: 'John', lastName: 'Smith', company: 'unde', email: 'john.smith@example.com', phone: '123-456-7890', address: '123 Main St', pincode: '123456', receivables: 278, credits: 82 },
        { id: 2, firstName: 'Emily', lastName: 'Johnson', company: 'animi', email: 'emily.johnson@example.com', phone: '987-654-3210', address: '456 Elm St', pincode: '654321', receivables: 892, credits: 88 },
        // ... more customer data
      ];
      setCustomers(data);
    };
    fetchCustomers();
  }, []);

  // Handle customer selection
  const handleSelectCustomer = (id) => {
    setSelectedCustomerIds(prev =>
      prev.includes(id) ? prev.filter(customerId => customerId !== id) : [...prev, id]
    );
  };

  // Delete selected customers
  const handleDeleteSelected = () => {
    setCustomers(customers.filter(customer => !selectedCustomerIds.includes(customer.id)));
    setSelectedCustomerIds([]);
  };

  // Delete all customers
  const handleDeleteAll = () => {
    setCustomers([]);
    setSelectedCustomerIds([]);
  };

  // Print customer information
  const handlePrint = (customer) => {
    setPrintCustomer(customer);
    setTimeout(() => {
      window.print();
    }, 100);
  };

  // Filtered customers based on search term
  const filteredCustomers = customers.filter(customer =>
    `${customer.firstName} ${customer.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">All Customers</h2>
      <div className="flex items-center mb-4">
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mr-4 p-2 border border-gray-300 rounded"
        />
        <button
          onClick={handleDeleteSelected}
          disabled={selectedCustomerIds.length === 0}
          className={`mr-2 px-4 py-2 rounded ${selectedCustomerIds.length === 0 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-red-500 text-white hover:bg-red-600'}`}
        >
          Delete Selected
        </button>
        <button
          onClick={handleDeleteAll}
          disabled={customers.length === 0}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Delete All
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="p-4"><input type="checkbox" disabled /></th>
              <th className="p-4 text-left">First Name</th>
              <th className="p-4 text-left">Last Name</th>
              <th className="p-4 text-left">Company</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Mobile Number</th>
              <th className="p-4 text-left">Address</th>
              <th className="p-4 text-left">Pincode</th>
              <th className="p-4 text-left">Receivables</th>
              <th className="p-4 text-left">Unused Credits</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map(customer => (
              <tr key={customer.id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="p-4">
                  <input
                    type="checkbox"
                    checked={selectedCustomerIds.includes(customer.id)}
                    onChange={() => handleSelectCustomer(customer.id)}
                    className="form-checkbox text-indigo-600"
                  />
                </td>
                <td className="p-4">{customer.firstName}</td>
                <td className="p-4">{customer.lastName}</td>
                <td className="p-4">{customer.company}</td>
                <td className="p-4">{customer.email}</td>
                <td className="p-4">{customer.phone}</td>
                <td className="p-4">{customer.address}</td>
                <td className="p-4">{customer.pincode}</td>
                <td className="p-4">Rs.{customer.receivables}</td>
                <td className="p-4">Rs.{customer.credits}</td>
                <td className="p-4">
                  <button
                    onClick={() => handlePrint(customer)}
                    className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Print
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Hidden print section */}
      {printCustomer && (
        <div className="print-section hidden">
          <h3 className="text-xl font-bold">Customer Details</h3>
          <p>Name: {printCustomer.firstName} {printCustomer.lastName}</p>
          <p>Company: {printCustomer.company}</p>
          <p>Email: {printCustomer.email}</p>
          <p>Phone: {printCustomer.phone}</p>
          <p>Address: {printCustomer.address}</p>
          <p>Pincode: {printCustomer.pincode}</p>
          <p>Receivables: Rs.{printCustomer.receivables}</p>
          <p>Unused Credits: Rs.{printCustomer.credits}</p>
        </div>
      )}
    </div>
  );
};

export default CustomersSection;
