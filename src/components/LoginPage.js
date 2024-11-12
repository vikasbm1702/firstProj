import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [userType, setUserType] = useState('user');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    // Check if the entered username (email) and password match the required credentials
    if (username === 'bmvikas2@gmail.com' && password === '12345') {
      if (userType === 'admin') {
        navigate('/admin-dashboard');
      } else {
        // Pass the username to the staff dashboard
        navigate(`/staff-dashboard?username=${username}`);
      }
    } else {
      alert('Invalid credentials. Please try again.');
    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-orange-500 to-white">
      <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-orange-600 mb-6 text-center">
          Welcome Back
        </h2>

        <select
          className="mb-4 p-3 w-full border border-orange-300 rounded focus:outline-none focus:border-orange-500"
          value={userType}
          onChange={(e) => setUserType(e.target.value)}
        >
          <option value="user">Staff</option>
          <option value="admin">Admin</option>
        </select>

        <input
          type="text"
          placeholder="Username"
          className="mb-4 p-3 w-full border border-orange-300 rounded focus:outline-none focus:border-orange-500"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="mb-6 p-3 w-full border border-orange-300 rounded focus:outline-none focus:border-orange-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="bg-orange-600 text-white font-bold p-3 w-full rounded hover:bg-orange-700 transition-colors duration-300"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
