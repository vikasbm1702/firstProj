// src/components/Staff/NewCustomer.jsx
import React, { useState } from 'react';

const NewCustomer = ({ onClose }) => {
  const [formData, setFormData] = useState({
    mobileNumber: '',
    firstName: '',
    lastName: '',
    email: '',
    address1: '',
    address2: '',
    pincode: '',
    otp: '',
  });

  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSendOtp = () => {
    if (formData.mobileNumber) {
      alert('OTP sent to ' + formData.mobileNumber);
      setOtpSent(true);
    } else {
      alert('Please enter a valid mobile number');
    }
  };

  const handleVerifyOtp = () => {
    if (formData.otp === '1234') {
      setOtpVerified(true);
      alert('OTP Verified!');
    } else {
      alert('Invalid OTP, please try again.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (otpVerified) {
      console.log('New Customer Data:', formData);
      alert('Customer added successfully!');
      onClose();
    } else {
      alert('Please verify the OTP first.');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">New Customer</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="mobileNumber"
          placeholder="Mobile Number"
          value={formData.mobileNumber}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded"
        />
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded"
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded"
        />
        <input
          type="text"
          name="address1"
          placeholder="Address Line 1"
          value={formData.address1}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded"
        />
        <input
          type="text"
          name="address2"
          placeholder="Address Line 2"
          value={formData.address2}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded"
        />
        <input
          type="text"
          name="pincode"
          placeholder="Pincode"
          value={formData.pincode}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded"
        />

        {otpSent && (
          <>
            <input
              type="text"
              name="otp"
              placeholder="Enter OTP"
              value={formData.otp}
              onChange={handleChange}
              className="w-full p-2 mb-4 border rounded"
            />
            <button
              type="button"
              onClick={handleVerifyOtp}
              className="bg-orange-600 text-white w-full p-2 mb-4 rounded"
            >
              Verify OTP
            </button>
          </>
        )}

        {!otpSent && (
          <button
            type="button"
            onClick={handleSendOtp}
            className="bg-orange-600 text-white w-full p-2 mb-4 rounded"
          >
            Send OTP
          </button>
        )}

        <button type="submit" className="bg-blue-600 text-white w-full p-2 rounded">
          Submit
        </button>
      </form>
      <button onClick={onClose} className="mt-4 text-red-500 hover:underline">
        Cancel
      </button>
    </div>
  );
};

export default NewCustomer;
