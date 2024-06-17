// src/MarketData.tsx
import React, { useState, useEffect } from 'react';
import { fetchMarketIndices, MarketData } from '../utils/api';

const MarketDataComponent: React.FC = () => {
  const [marketData, setMarketData] = useState<MarketData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getMarketData = async () => {
      try {
        const data = await fetchMarketIndices();
        setMarketData(data);
        setLoading(false);
      } catch (err) {
        setError((err as Error).message);
        setLoading(false);
      }
    };

    getMarketData();
  }, []);

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-500">Error: {error}</div>;

  return (
    <div className="container ml-[10vh] p-4">
      <h1 className="text-2xl font-bold mb-4">Market Indices</h1>
      <table className="min-w-full bg-white shadow-md rounded">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Asset</th>
            <th className="py-2 px-4 border-b">Current Value</th>
            <th className="py-2 px-4 border-b">Daily Change</th>
            <th className="py-2 px-4 border-b">Percentage Change</th>
          </tr>
        </thead>
        <tbody>
          {marketData.map((item, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b">{item.Asset}</td>
              <td className="py-2 px-4 border-b">{item.CurrentValue}</td>
              <td className={`py-2 px-4 border-b ${item.DailyChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {item.DailyChange}
              </td>
              <td className={`py-2 px-4 border-b ${item.PercentageChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {item.PercentageChange}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MarketDataComponent;
