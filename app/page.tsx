import Link from 'next/link';
import type { Stock } from '@/types/stock';

export default function HomePage() {
  const STOCK_LIST: Array<Stock> = [
    {symbol: 'IBM', name: 'IBM'},
    {symbol: 'AAPL', name: 'Apple'},
    {symbol: 'MSFT', name: 'Microsoft'},
    {symbol: 'AMZN', name: 'Amazon'},
    {symbol: 'META', name: 'Meta'},
    {symbol: 'NVDA', name: 'NVIDIA'},
    {symbol: 'NFLX', name: 'Netflix'},
    {symbol: 'DIS', name: 'Walt Disney Co'},
    {symbol: 'TSLA', name: 'Tesla'},
    {symbol: 'GOOG', name: 'Google'},
    {symbol: 'AVGO', name: 'Broadcom Inc'},
    {symbol: 'ORCL', name: 'Oracle'},
    {symbol: 'AMD', name: 'Advanced Micro Devices'},
    {symbol: 'MU', name: 'Micron Technology'},
    {symbol: 'PLTR', name: 'Palantir'}
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            Stock Market Dashboard
          </h1>
          <p className="text-gray-300 text-lg">
            Click on any stock to view detailed information and historical prices
          </p>
        </div>

        {/* Stock Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {STOCK_LIST.map((stock: Stock) => (
            <Link
              key={stock.symbol}
              href={`/stock/${stock.symbol}`}
              className="group"
            >
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer active:scale-95 active:bg-white/30">
                {/* Stock Symbol */}
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold text-xl px-4 py-2 rounded-lg">
                    {stock.symbol}
                  </div>
                  <div className="text-gray-400 text-sm">{stock.exchange}</div>
                </div>

                {/* Company Name */}
                <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-blue-300 transition-colors">
                  {stock.name}
                </h3>

                {/* View Details Link */}
                <div className="flex items-center text-blue-400 text-sm font-medium mt-4">
                  <span>View Details</span>
                  <svg
                    className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
