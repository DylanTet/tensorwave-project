export interface Stock {
  symbol: string;
  name: string;
  exchange?: string;
}

export interface CompanyOverview {
  Symbol: string;
  AssetType: string;
  Name: string;
  Description: string;
  Exchange: string;
  Sector: string;
  Industry: string;
  MarketCapitalization: string;
}

export interface ChartDataPoint {
  date: string;
  price: number;
  percentChange: number;
  volume: string;
}

export interface TimeSeriesDailyDataResponse {
  [date: string] : {
    '1. open': string;
    '2. high': string;
    '3. low': string;
    '4. close': string;
    '5. volume': string;
  }
}

export interface TimeSeriesResponse {
  'Meta Data': {
    '1. Information': string;
    '2. Symbol': string;
    '3. Last Refreshed': string;
    '4. Output Size': string;
    '5. Time Zone': string;
  };
  'Time Series (Daily)': TimeSeriesDailyDataResponse;
}

export interface HistoricalPrice {
  date: string;
  close: number;
  volume: number;
  percentageChange: number;
}

export interface StockDetails {
  overview: CompanyOverview;
  historicalPrices: HistoricalPrice[];
}

export interface ApiError {
  error: string;
  message: string;
}
