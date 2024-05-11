import React, { useState } from 'react';
import { API_BASE } from '../constants/data';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import "./Spinner.css"

const AddProduct = () => {
  const [formData, setFormData] = useState({
    itemName: '',
    itemDescription: '',
    price: '',
    category: 'Machine',
  });

  const [loader, setLoader] = useState(false);

 

  // form change handler
  const changeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };


  const [base64URL, setBase64URL] = useState('');
  console.log(base64URL);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const base64URL = e.target.result;
        setBase64URL(base64URL);
      };
      reader.readAsDataURL(file);
    }
  };


  const submitHandler = async (event) => {
    event.preventDefault();

    const data = new FormData();
    data.append('itemName', formData.itemName);
    data.append('itemDescription', formData.itemDescription);
    data.append('price', formData.price);
    data.append('category', formData.category);
    data.append('thumbnail', base64URL);

    setLoader(true);
    try {
      const response = await axios.post(`${API_BASE}/addProduct`, data, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success(response.data.message);
      setLoader(false);
    } catch (err) {
      toast.error(err.message);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center">
      { loader===false? 
      <form
        method="post"
        encType="multipart/form-data"
        onSubmit={submitHandler}
        className="max-w-md mx-auto p-8 bg-white rounded-lg shadow-lg"
      >
        <h2 className="text-2xl font-semibold mb-4">Product Details</h2>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Item Name"
            onChange={changeHandler}
            name="itemName"
            value={formData.itemName}
            className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <input
            type="text"
            placeholder="About Product"
            onChange={changeHandler}
            name="itemDescription"
            value={formData.itemDescription}
            className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <input
            type="number"
            placeholder="Price"
            onChange={changeHandler}
            name="price"
            value={formData.price}
            className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="category" className="block text-gray-600">
            Product Category:
          </label>
          <select
            onChange={changeHandler}
            name="category"
            id="category"
            value={formData.category}
            className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
          >
            <option value="Machine">Machine</option>
            <option value="Accessory">Accessory</option>
          </select>
        </div>

        <label htmlFor="image">Please upload a Product image:</label>
        <input
          type="file"
          id="image"
          name="thumbnail"
          accept="image/jpg, image/jpeg, image/webp"
          onChange={handleImageUpload}
        />

        {base64URL && (
          <img
            src={base64URL}
            alt="product file"
            style={{ maxWidth: '100%', maxHeight: '200px' }}
          />
        )}

        <button
          type="submit"
          className="bg-slate-800 font-bold hover:bg-slate-900 w-full py-2  text-white rounded-lg"
        >
          Add Product
        </button>
      </form>:<span class="loader"></span>
    }
    </div>
  );
};

export default AddProduct;
