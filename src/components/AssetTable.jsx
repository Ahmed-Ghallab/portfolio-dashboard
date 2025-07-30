import React from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteAsset } from '../services/api';

const AssetTable = ({ assets, refresh }) => {
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this asset?')) {
      await deleteAsset(id);
      refresh();
    }
  };

  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Quantity</th>
            <th>Buy Price</th>
            <th>Current Value</th>
            <th>Total Return</th>
            <th>% Change</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {assets.map(asset => {
            const currentValue = asset.quantity * asset.currentPrice;
            const invested = asset.quantity * asset.buyPrice;
            const totalReturn = currentValue - invested;
            const percentageChange = ((currentValue - invested) / invested) * 100;

            return (
              <tr key={asset.id}>
                <td>{asset.name}</td>
                <td>{asset.type}</td>
                <td>{asset.quantity}</td>
                <td>${asset.buyPrice.toFixed(2)}</td>
                <td>${currentValue.toFixed(2)}</td>
                <td
                  className={totalReturn >= 0 ? 'text-success' : 'text-danger'}
                >
                  ${totalReturn.toFixed(2)}
                </td>
                <td
                  className={percentageChange >= 0 ? 'text-success' : 'text-danger'}
                >
                  {percentageChange.toFixed(2)}%
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-primary me-2"
                    onClick={() => navigate(`/edit/${asset.id}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(asset.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AssetTable;
