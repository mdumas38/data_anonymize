import { Crawler } from './crawler';
import { CrawlerConfig, CrawlerResponse } from './types';

export async function crawlArxiv(): Promise<string> {
  console.log("[arXiv Crawler] Starting arXiv crawl process");
  const config: CrawlerConfig = {
    url: 'https://arxiv.org/abs/2408.17401',
    limit: 100,
    return_format: 'json',
    readability: true,
    metadata: true,
    store_data: true,
    depth: 2,
    anti_bot: true,
    headers: {
      authorization: process.env.SPIDER_API_KEY || 'YOUR_API_KEY'
    },
    viewport: {
      width: 1366,
      height: 768,
      device_scale_factor: 1,
      emulating_mobile: false,
      is_landscape: true,
      has_touch: false
    },
    encoding: 'utf-8',
    locale: 'en_US',
    user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    page_insights: true,
    respect_robots: true,
    full_resources: true,
    request_timeout: 30,
    smart_mode: true,
    proxy_enabled: true,
    gpt_config: {
      prompt: "wait for the main content of the page to load",
      model: "gpt-4o-mini",
      max_tokens: 2000,
      temperature: 0.50,
      top_p: 0.15,
      api_key: process.env.GPT_API_KEY || 'YOUR_GPT_API_KEY'
    }
  } as CrawlerConfig;

  try {
    console.log("[arXiv Crawler] Crawler config:", JSON.stringify(config, null, 2));
    const crawler = new Crawler();
    const response: CrawlerResponse = await crawler.crawl(config);
    console.log("[arXiv Crawler] Crawl response:", JSON.stringify(response, null, 2));

    if (response.content) {
      console.log("[arXiv Crawler] Crawl successful. Sample of scraped data:");
      return response.content;
    } else if (response.metadata) {
      console.log("[arXiv Crawler] No content received, but metadata is available:", JSON.stringify(response.metadata, null, 2));
      return "No content received, but metadata is available.";
    } else {
      console.log("[arXiv Crawler] No content or metadata received from the crawler.");
      return "No content or metadata received from the crawler.";
    }
  } catch (error: unknown) {
    console.error('[arXiv Crawler] Crawl error:', error);
    if (error instanceof Error && 'response' in error) {
      const errorResponse = error.response as { data?: unknown };
      if (errorResponse.data) {
        console.error('[arXiv Crawler] Error response:', JSON.stringify(errorResponse.data, null, 2));
      }
    }
    throw error;
  }
}

// function logSampleData(content: string) {
//   const lines = content.split('\n');
//   const sampleSize = Math.min(10, lines.length);
//   console.log(lines.slice(0, sampleSize).join('\n'));
//   console.log(`... (${lines.length - sampleSize} more lines)`);
// }

// function formatArxivData(content: string): string {
//   // Formatting logic here
//   const formattedContent = content; // Replace with actual formatting logic
//   console.log("[arXiv Crawler] Data formatting complete. Sample of formatted data:");
//   logSampleData(formattedContent);
//   return formattedContent;
// }