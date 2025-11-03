'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useStockData } from '@/hooks/useStockData';
import StockChart from '@/components/StockChart';
import type { ChartDataPoint, CompanyOverview } from '@/types/stock';

function formatMarketCap(marketCap: string): string {
  if (!marketCap || marketCap === 'None') return 'N/A';
  const num = parseInt(marketCap, 10);
  if (isNaN(num)) return 'N/A';
  
  if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`;
  if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
  if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
  return `$${num.toLocaleString()}`;
}

function CompanyOverviewSection({ overview }: { overview: CompanyOverview }) {
  const displayValue = (value: string | undefined) => value || 'N/A';

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20 mb-8">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">
            {displayValue(overview.Name)}
          </h1>
          <div className="flex gap-4 text-gray-300 flex-wrap">
            <span className="bg-blue-500/20 px-3 py-1 rounded-full">
              {displayValue(overview.Symbol)}
            </span>
            <span>{displayValue(overview.AssetType)}</span>
            <span>{displayValue(overview.Exchange)}</span>
          </div>
        </div>
      </div>

      <p className="text-gray-300 mb-6 leading-relaxed">
        {displayValue(overview.Description)}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white/5 p-4 rounded-lg">
          <div className="text-gray-400 text-sm mb-1">Sector</div>
          <div className="text-white font-semibold">
            {displayValue(overview.Sector)}
          </div>
        </div>
        <div className="bg-white/5 p-4 rounded-lg">
          <div className="text-gray-400 text-sm mb-1">Industry</div>
          <div className="text-white font-semibold">
            {displayValue(overview.Industry)}
          </div>
        </div>
        <div className="bg-white/5 p-4 rounded-lg">
          <div className="text-gray-400 text-sm mb-1">Market Cap</div>
          <div className="text-white font-semibold">
            {formatMarketCap(overview.MarketCapitalization)}
          </div>
        </div>
        <div className="bg-white/5 p-4 rounded-lg">
          <div className="text-gray-400 text-sm mb-1">Exchange</div>
          <div className="text-white font-semibold">
            {displayValue(overview.Exchange)}
          </div>
        </div>
      </div>
    </div>
  );
}

function HistoricalPricesTable({ prices }: { prices: ChartDataPoint[] }) {
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20">
      <h2 className="text-2xl font-bold text-white mb-6">Historical Prices</h2>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/20">
              <th className="text-left text-gray-300 font-semibold py-3 px-4">
                Date
              </th>
              <th className="text-right text-gray-300 font-semibold py-3 px-4">
                Close Price
              </th>
              <th className="text-right text-gray-300 font-semibold py-3 px-4">
                Volume
              </th>
              <th className="text-right text-gray-300 font-semibold py-3 px-4">
                % Change
              </th>
            </tr>
          </thead>
          <tbody>
            {prices
              .map((data, index) => (
              <tr
                key={index}
                className="border-b border-white/10 hover:bg-white/5 transition-colors"
              >
                <td className="py-3 px-4 text-white">{data.date}
                </td>
                <td className="py-3 px-4 text-white text-right">
                  {data.price}
                </td>
                <td className="py-3 px-4 text-gray-300 text-right">
                  {data.volume}
                </td>
                <td
                  className={`py-3 px-4 text-right font-semibold ${
                    data.percentChange > 0
                      ? 'text-green-400'
                      : data.percentChange < 0
                      ? 'text-red-400'
                      : 'text-gray-400'
                  }`}
                >
                  {data.percentChange > 0 ? '+' : ''}{data.percentChange.toFixed(2)}
                </td>
              </tr>
            )).reverse()}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function StockDetailsPage() {
  const params = useParams();
  const symbol = params.symbol as string;
  const { overview, historicalPrices, isLoading, error } = useStockData(symbol.toUpperCase());

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[60vh]">
            <h1>...</h1>
          </div>
        </div>
      </div>
    );
  }

  if (error || !overview) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Error Loading Stock Data</h1>
          <p className="text-gray-300 mb-8">
            {error || `Unable to fetch data for ${symbol.toUpperCase()}`}
          </p>
          <Link
            href="/"
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors inline-block"
          >
            Back to Home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-6 transition-colors"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Dashboard
        </Link>

        {/* Company Overview */}
        <CompanyOverviewSection overview={overview} />

        {/* Price Chart */}
        {historicalPrices && (
          <StockChart prices={historicalPrices} symbol={symbol.toUpperCase()} />
        )}

        {/* Historical Prices Table */}
        {historicalPrices && (
          <HistoricalPricesTable prices={historicalPrices} />
        )}
        
      </div>
    </main>
  );
}
