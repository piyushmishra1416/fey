import axios from 'axios';

const RAPIDAPI_KEY = '39a139cfddmshf842321ccc06578p11a68bjsndb8ef3a37b1d'; // Replace with your actual RapidAPI key
const BASE_URL_QUOTES = 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/v2/get-quotes';
const BASE_URL_CHART = 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-chart';
const BASE_URL_FINNHUB = 'https://finnhub.io/api/v1';

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
        'x-rapidapi-key': RAPIDAPI_KEY,
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
        'x-rapidapi-key': RAPIDAPI_KEY,
      },
      params: {
        symbol: symbol,
        range: range,
        region: 'US',
        interval: range === '1d' ? '5m' : '1d', // Use 5-minute interval for 1 day, 1 day interval for others
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
        token: 'cpo62qpr01qj9etuuht0cpo62qpr01qj9etuuhtg', // Replace with your actual Finnhub API token
      },
    });

    return response.data; // Return the entire response data object
  } catch (error) {
    console.error('Error fetching market news:', error);
    throw error;
  }
};

const API_KEYY = 'fBqAcgchRGvVqMRgK7FE2bgWmLoyoZ1y'; // Replace with your actual API key
const BASE_URL_PERF = 'https://financialmodelingprep.com/api/v3';

export const fetchSectorPerformance = async (): Promise<any> => {
  try {
    const response = await axios.get(`${BASE_URL_PERF}/sectors-performance`, {
      params: {
        apikey: API_KEYY,
      },
    });

    return response.data; // Return the entire response data object
  } catch (error) {
    console.error('Error fetching sector performance:', error);
    throw error;
  }
};
