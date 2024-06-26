import axios from 'axios';

const BASE_URL_QUOTES = 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/v2/get-quotes';
const BASE_URL_CHART = 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-chart';
const BASE_URL_FINNHUB = 'https://finnhub.io/api/v1';
const BASE_URL_PERF = 'https://financialmodelingprep.com/api/v3';

const symbols = ['^GSPC', '^IXIC', '^DJI', 'CL=F', 'GC=F', 'SI=F', 'BTC-USD'];

export interface MarketData {
  Asset: string;
  CurrentValue: number;
  DailyChange: number;
  PercentageChange: number;
}

export const fetchMarketIndices = async (): Promise<MarketData[]> => {
  try {
    const response = await axios.get(BASE_URL_QUOTES, {
      headers: {
        'x-rapidapi-host': 'apidojo-yahoo-finance-v1.p.rapidapi.com',
        'x-rapidapi-key': import.meta.env.VITE_RAPIDAPI_KEY, // Adjust this according to your environment
      },
      params: {
        region: 'US',
        symbols: symbols.join(',')
      }
    });

    const marketData: MarketData[] = response.data.quoteResponse.result.map((asset: any) => ({
      Asset: asset.shortName || asset.symbol,
      CurrentValue: asset.regularMarketPrice,
      DailyChange: asset.regularMarketChange,
      PercentageChange: asset.regularMarketChangePercent,
    }));

    return marketData;
  } catch (error) {
    console.error('Error fetching market indices:', error);
    throw error;
  }
};

export interface HistoricalData {
  timestamp: number[];
  close: number[];
}

export const fetchHistoricalData = async (symbol: string, range: string): Promise<HistoricalData> => {
  try {
    const response = await axios.get(BASE_URL_CHART, {
      headers: {
        'x-rapidapi-host': 'apidojo-yahoo-finance-v1.p.rapidapi.com',
        'x-rapidapi-key': import.meta.env.VITE_RAPIDAPI_KEY, // Adjust this according to your environment
      },
      params: {
        symbol: symbol,
        range: range,
        region: 'US',
        interval: range === '1d' ? '5m' : '1d',
      }
    });

    const data = response.data.chart.result[0];
    return {
      timestamp: data.timestamp,
      close: data.indicators.quote[0].close,
    };
  } catch (error) {
    console.error('Error fetching historical data:', error);
    throw error;
  }
};

export const fetchMarketNews = async (): Promise<any> => {
  try {
    const response = await axios.get(`${BASE_URL_FINNHUB}/news`, {
      params: {
        category: 'general',
        token: import.meta.env.VITE_FINNHUB_KEY, // Adjust this according to your environment
      },
    });

    return response.data; 
  } catch (error) {
    console.error('Error fetching market news:', error);
    throw error;
  }
};

export interface SectorPerformanceData {
  sector: string;
  changesPercentage: string;
}

export const fetchSectorPerformance = async (): Promise<SectorPerformanceData[]> => {
  try {
    console.log("apikey", import.meta.env.VITE_API_KEYY);
    const constructedUrl = `${BASE_URL_PERF}/sectors-performance?apikey=${import.meta.env.VITE_API_KEYY}`;
    console.log("URL", constructedUrl);
    const response = await axios.get(constructedUrl);
    return response.data; // Ensure this matches the structure of the response data
  } catch (error) {
    console.error('Error fetching sector performance:', error);
    throw error;
  }
};
