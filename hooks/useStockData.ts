'use client';

import { useState, useEffect } from 'react';
import { ApiService } from '@/lib/clientApiService';
import type { ChartDataPoint, CompanyOverview } from '@/types/stock';

interface UseStockDataResult {
  overview: CompanyOverview | null;
  historicalPrices: ChartDataPoint[] | null;
  isLoading: boolean;
  error: string | null;
}

export function useStockData(symbol: string): UseStockDataResult {
  const [overview, setOverview] = useState<CompanyOverview | null>(null);
  const [historicalPrices, setHistoricalPrices] = useState<ChartDataPoint[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!symbol) {
      return
    }
    const fetchStockData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await ApiService.getStockData(symbol);
        setOverview(data.overview);

        let prevEntry = data.historicalPrices['Time Series (Daily)'][0];
        const chartData: ChartDataPoint[] = Object.entries(data.historicalPrices['Time Series (Daily)'])
          .reverse()
          .map(([date, value], _) => {
          const price = parseFloat(value['4. close']);
          const previousPrice = prevEntry ? parseFloat(prevEntry['4. close']) : null;
          const volume = value['5. volume'];

          const percentChange =
            previousPrice !== null
              ? ((price - previousPrice) / previousPrice) * 100
              : 0; // 0% for first day
          prevEntry = value;

          return {
            date: new Date(date).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
            }),
            price,
            percentChange,
            volume
          };
        }).slice(-30);
        setHistoricalPrices(chartData);

      } catch (err) {
        const errorMessage = err instanceof Error 
          ? err.message 
          : 'An error occurred while fetching stock data';
        
        setError(errorMessage);
        console.error('Error fetching stock data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStockData();
  }, [symbol]);

  return { overview, historicalPrices, isLoading, error };
}
