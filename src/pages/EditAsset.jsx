import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import API, { updateAsset } from '../services/api';

const EditAsset = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    quantity: '',
    buyPrice: '',
    currentPrice: '',
  });

  useEffect(() => {
    const fetchAsset = async () => {
      try {
        const { data } = await API.get(`/assets/${id}`);
        setFormData(data);
      } catch (error) {
        console.error('Error fetching asset', error);
      }
    };

    fetchAsset();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedAsset = {
      ...formData,
      quantity: parseFloat(formData.quantity),
      buyPrice: parseFloat(formData.buyPrice),
      currentPrice: parseFloat(formData.currentPrice),
    };
    await updateAsset(id, updatedAsset);
    navigate('/');
  };

  return (
    <div>
      <h2>Edit Asset</h2>
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Type</label>
          <select
            className="form-select"
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            <option value="Stock">Stock</option>
            <option value="Bond">Bond</option>
            <option value="Crypto">Crypto</option>
          </select>
        </div>
        <div className="col-md-4">
          <label className="form-label">Quantity</label>
          <input
            type="number"
            className="form-control"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-4">
          <label className="form-label">Buy Price</label>
          <input
            type="number"
            className="form-control"
            name="buyPrice"
            step="0.01"
            value={formData.buyPrice}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-4">
          <label className="form-label">Current Price</label>
          <input
            type="number"
            className="form-control"
            name="currentPrice"
            step="0.01"
            value={formData.currentPrice}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary">Update Asset</button>
        </div>
      </form>
    </div>
  );
};

export default EditAsset;
