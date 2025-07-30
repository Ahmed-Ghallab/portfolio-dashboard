import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getAssets = () => API.get('/assets');
export const addAsset = (asset) => API.post('/assets', asset);
export const updateAsset = (id, asset) => API.put(`/assets/${id}`, asset);
export const deleteAsset = (id) => API.delete(`/assets/${id}`);

export default API;
