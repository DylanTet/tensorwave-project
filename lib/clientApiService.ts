import type { CompanyOverview, HistoricalPrice, TimeSeriesResponse } from '@/types/stock';

export class ApiService {
  private static readonly BASE_URL = '/api/stock';

  private static async fetchApi<T>(url: string): Promise<T> {
    const response = await fetch(url);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.error || `API request failed with status ${response.status}`
      );
    }

    const data = await response.json();
    
    if (data && typeof data === 'object' && 'error' in data) {
      throw new Error(data.error as string);
    }

    return data as T;
  }

  static async getCompanyOverview(symbol: string): Promise<CompanyOverview> {
    return this.fetchApi<CompanyOverview>(
      `${this.BASE_URL}/${symbol}/overview`
    );
  }

  static async getHistoricalPrices(symbol: string): Promise<TimeSeriesResponse> {
    return this.fetchApi<TimeSeriesResponse>(
      `${this.BASE_URL}/${symbol}/timeseries`
    );
  }

  static async getStockData(symbol: string): Promise<{
    overview: CompanyOverview;
    historicalPrices: TimeSeriesResponse;
  }> {
    const [overview, historicalPrices] = await Promise.all([
      this.getCompanyOverview(symbol),
      this.getHistoricalPrices(symbol),
    ]);
    return { overview, historicalPrices };
  }
}
