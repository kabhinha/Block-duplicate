import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE } from '../constants/data';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-hot-toast";


export const SignUp = () => {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    accountType: 'Customer',
  });
  

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    await signUp();
  };

  const signUp = async () => {
    try {
      await axios.post(`${API_BASE}/signup`, formData);
      toast.success("Verification Email sent successfully");
      navigate('/login')

    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
   
      <form onSubmit={submitHandler} className="max-w-md mx-auto p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
        <div className="mb-4">
          <input
            type="text"
            placeholder="First Name"
            onChange={changeHandler}
            name="firstName"
            value={formData.firstName}
            className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Last Name"
            onChange={changeHandler}
            name="lastName"
            value={formData.lastName}
            className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <input
            type="email"
            placeholder="E-Mail"
            onChange={changeHandler}
            name="email"
            value={formData.email}
            className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="Role" className="block text-gray-600">
            AccountType:
          </label>
          <select
            onChange={changeHandler}
            name="accountType"
            id="Role"
            value={formData.role}
            className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
          >
            <option value="Admin">Admin</option>
            <option value="Seller">Seller</option>
            <option value="Customer">Customer</option>
          </select>
        </div>
        <div className="mb-4">
          <input
            type="password"
            placeholder="Create Password"
            onChange={changeHandler}
            name="password"
            value={formData.password}
            className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            placeholder="Confirm Password"
            onChange={changeHandler}
            name="confirmPassword"
            value={formData.confirmPassword}
            className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
          />
        </div>
       
        <div className='flex gap-4'>
          <button
            type="submit"
            className="bg-slate-800  hover:bg-slate-900 w-full py-2  text-white rounded-lg"
          >
            Sign Up
          </button>
          <button
            type="submit"
            className="bg-slate-800  hover:bg-slate-900 w-full py-2  text-white rounded-lg"
            onClick={() => navigate('/login')}
          >
            Login
          </button>
        </div>

      </form>
      
     
    </div>


  );
};


