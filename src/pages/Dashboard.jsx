import React, { useEffect, useState } from 'react';
import { getAssets } from '../services/api';
import AssetTable from '../components/AssetTable';
import PieChartComponent from '../components/PieChartComponent';
import LineChartComponent from '../components/LineChartComponent';
import PLSimulator from '../components/PLSimulator';

const Dashboard = () => {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAssets = async () => {
    try {
      const { data } = await getAssets();
      setAssets(data);
    } catch (error) {
      console.error('Error fetching assets', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssets();
  }, []);

  if (loading) return <div className="text-center">Loading portfolio...</div>;

  return (
    <div>
      <h2>Portfolio Overview</h2>
      <AssetTable assets={assets} refresh={fetchAssets} />

      <div className="row mt-4">
        <div className="col-md-6">
          <PieChartComponent assets={assets} />
        </div>
        <div className="col-md-6">
          <LineChartComponent assets={assets} />
        </div>
      </div>

      <div className="mt-4">
        <PLSimulator assets={assets} />
      </div>
    </div>
  );
};

export default Dashboard;
