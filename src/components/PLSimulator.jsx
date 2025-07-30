import React, { useState } from 'react';

const PLSimulator = ({ assets }) => {
  const [changePercent, setChangePercent] = useState(0);

  const handleSliderChange = (e) => {
    setChangePercent(parseFloat(e.target.value));
  };

  const simulatedData = assets.map((asset) => {
    const simulatedPrice = asset.currentPrice * (1 + changePercent / 100);
    const currentValue = simulatedPrice * asset.quantity;
    const invested = asset.quantity * asset.buyPrice;
    const profitLoss = currentValue - invested;
    return {
      ...asset,
      simulatedPrice,
      currentValue,
      profitLoss,
    };
  });

  const totalInvested = simulatedData.reduce((sum, a) => sum + a.buyPrice * a.quantity, 0);
  const totalValue = simulatedData.reduce((sum, a) => sum + a.currentValue, 0);
  const totalPL = totalValue - totalInvested;

  return (
    <div className="mt-4">
      <h5 className="text-center mb-3">Profit/Loss Simulator</h5>

      <div className="mb-3">
        <label className="form-label">Price Change: {changePercent}%</label>
        <input
          type="range"
          className="form-range"
          min="-50"
          max="50"
          step="1"
          value={changePercent}
          onChange={handleSliderChange}
        />
      </div>

      <div className="row text-center mb-4">
        <div className="col">
          <h6>Total Invested</h6>
          <p>${totalInvested.toFixed(2)}</p>
        </div>
        <div className="col">
          <h6>Simulated Value</h6>
          <p>${totalValue.toFixed(2)}</p>
        </div>
        <div className="col">
          <h6>Projected P/L</h6>
          <p className={totalPL >= 0 ? 'text-success' : 'text-danger'}>
            ${totalPL.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PLSimulator;
