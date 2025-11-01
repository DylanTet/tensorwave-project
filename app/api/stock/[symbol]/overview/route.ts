import { NextRequest, NextResponse } from 'next/server';
import type { CompanyOverview } from '@/types/stock';

export async function GET(
  request: NextRequest,
  { params }: { params: { symbol: string } }
): Promise<NextResponse<CompanyOverview | { error: string }>> {
  try {
    const { symbol } = await params;
    
    if (!symbol) {
      return NextResponse.json(
        { error: 'Stock symbol is required' },
        { status: 400 }
      );
    }

    const url = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${process.env.NEXT_PUBLIC_ALPHA_API_KEY}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.error || `API request failed with status ${response.status}`
      );
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching company overview:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch company overview' },
      { status: 500 }
    );
  }
}
