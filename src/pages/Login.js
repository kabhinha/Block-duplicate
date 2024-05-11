import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE } from '../constants/data';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-hot-toast";



export const Login = () => {
    const [LoginData, setLoginData] = useState({ email: '', password: "" });
    const navigate = useNavigate();
  
    const loginHandler = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post(`${API_BASE}/login`, {
          email: LoginData.email,
          password: LoginData.password,
         
        }, {withCredentials: true});
  
        const isVerified = response.data.existingUser.verified;

        if (isVerified) {
          toast.success("Logged in Successfully");
          navigate(`/`);
        }
      } catch (err) {
          toast.error(err.response.data.message);
      }
    };
  
    const loginDetails = (event) => {
      const { name, value } = event.target;
      setLoginData((data) => ({
        ...data,
        [name]: value,
      }));
    };
  
    return (
      <div className="min-h-screen flex items-center justify-center">
        <form onSubmit={loginHandler} className="max-w-md mx-auto p-8 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Login</h2>
          <div className="mb-4 border border-slate-100">
            <input
              type="email"
              placeholder="Enter E-mail"
              onChange={loginDetails}
              name="email"
              value={LoginData.email}
              className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4 border border-slate-100">
            <input
              type="password"
              placeholder="Enter Password"
              onChange={loginDetails}
              name="password"
              value={LoginData.password}
              className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="bg-slate-800 font-bold hover:bg-slate-900 w-full py-2  text-white rounded-lg"
          >
            Sign In
          </button>

          <p className='mt-2 cursor-pointer' onClick={()=>navigate('/signup')}>Create account</p>

        </form>
      </div>
    );
  };