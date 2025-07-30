import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addAsset } from '../services/api';

const AddAsset = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    quantity: '',
    buyPrice: '',
    currentPrice: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const asset = {
      ...formData,
      quantity: parseFloat(formData.quantity),
      buyPrice: parseFloat(formData.buyPrice),
      currentPrice: parseFloat(formData.currentPrice),
    };
    await addAsset(asset);
    navigate('/');
  };

  return (
    <div>
      <h2>Add New Asset</h2>
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Name</label>
          <input type="text" className="form-control" name="name" required onChange={handleChange} />
        </div>
        <div className="col-md-6">
          <label className="form-label">Type</label>
          <select className="form-select" name="type" required onChange={handleChange}>
            <option value="">Select</option>
            <option value="Stock">Stock</option>
            <option value="Bond">Bond</option>
            <option value="Crypto">Crypto</option>
          </select>
        </div>
        <div className="col-md-4">
          <label className="form-label">Quantity</label>
          <input type="number" className="form-control" name="quantity" required onChange={handleChange} />
        </div>
        <div className="col-md-4">
          <label className="form-label">Buy Price</label>
          <input type="number" className="form-control" name="buyPrice" step="0.01" required onChange={handleChange} />
        </div>
        <div className="col-md-4">
          <label className="form-label">Current Price</label>
          <input type="number" className="form-control" name="currentPrice" step="0.01" required onChange={handleChange} />
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-success">Add Asset</button>
        </div>
      </form>
    </div>
  );
};

export default AddAsset;
