// src/ChartComponent.tsx
import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { fetchHistoricalData, HistoricalData } from '../utils/api';
import 'chart.js/auto';  // Required for auto-registering all components

const timeRanges = ['1d', '5d', '1mo', '3mo', '1y', '5y', 'max'];

const ChartComponent: React.FC = () => {
  const [data, setData] = useState<HistoricalData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedRange, setSelectedRange] = useState<string>('1d');
  const [symbol] = useState<string>('SPY'); // Default symbol (SPDR S&P 500 ETF Trust)

  useEffect(() => {
    const getHistoricalData = async () => {
      setLoading(true);
      setError(null);
      try {
        const fetchedData = await fetchHistoricalData(symbol, selectedRange);
        setData(fetchedData);
        setLoading(false);
      } catch (err) {
        setError((err as Error).message);
        setLoading(false);
      }
    };

    getHistoricalData();
  }, [symbol, selectedRange]);

  // Ensure the chartData object always conforms to the expected type
  const chartData = {
    labels: data ? data.timestamp.map(ts => new Date(ts * 1000).toLocaleDateString()) : [],
    datasets: [
      {
        label: `${symbol} Price`,
        data: data ? data.close : [],
        fill: false,
        pointRadius: 0,
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(255,255,255, 1)',
        borderWidth: 1
      }
    ],
  };

  const options = {
    responsive: true,
    scales: {
    x: {
      display: false 
    },
  },}

  return (
    <div className="container mx-auto my-8 p-4">
      
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-500">Error: {error}</div>
      ) : (
        <Line  data={chartData} options={options} />
      )}
      <div className="mb-4">
        {timeRanges.map(range => (
          <button
            key={range}
            onClick={() => setSelectedRange(range)}
            className={`mx-1 px-3 py-1 border rounded ${selectedRange === range ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            {range.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ChartComponent;
