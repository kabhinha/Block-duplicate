import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import axios from 'axios';
import { API_BASE } from '../constants/data';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const SellerItems = () => {
  const navigate = useNavigate();
  const [machineItems, setMachineItems] = useState(null);
  const [accessories, setAccessories] = useState(null);

  const allItems = async () => {
    try {
      const response = await axios.get(`${API_BASE}/showItems`, { withCredentials: true });
      setMachineItems(response.data.data[0]);
      setAccessories(response.data.data[1]);
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  useEffect(() => {
    allItems();
  }, []);

  return (
    <div className="flex h-fit flex-col gap-20 items-center mt-9">
      <div className='flex w-full flex-col items-center gap-5'>
        <p className="text-4xl font-semibold mb-4">Machines</p>
        <div className='flex w-10/12 justify-center gap-4 flex-wrap'>
          {machineItems &&
            machineItems.map((machine, index) => (
              <Card key={index} {...machine} />
            ))}
          <div className="border-2 w-[20%] p-[11%] bg-slate-50 flex flex-col justify-center items-center">
            <div
              onClick={() => navigate('/addProduct')}
              className="text-4xl text-green-700 cursor-pointer"
            >
              +
            </div>
          </div>
        </div>
      </div>

      <div className='flex w-full flex-col items-center gap-5'>
        <p className="text-4xl font-semibold mb-4">Accessories</p>
        <div className='flex w-10/12 justify-center gap-4 flex-wrap'>
          {accessories &&
            accessories.map((accessory, index) => (
              <Card key={index} {...accessory} />
            ))}
           <div className="border-2 w-[20%] p-[11%] mb-6 h-full bg-slate-50 flex flex-col justify-center items-center">
            <div
              onClick={() => navigate('/addProduct')}
              className="text-4xl text-green-700 cursor-pointer"
            >
              +
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default SellerItems;
