import { NextResponse } from 'next/server';
import { crawlArxiv } from '../src/arxiv-crawler';

export async function GET() {
  try {
    console.log("[API] Initiating crawlArxiv function...");
    const result = await crawlArxiv();
    console.log("[API] crawlArxiv completed successfully.");
    return NextResponse.json({ data: result });
  } catch (error) {
    console.error('[API] Crawl error:', error);
    return NextResponse.json({ error: 'An error occurred while crawling arXiv' }, { status: 500 });
  }
}
