import axios, { AxiosInstance } from 'axios';
import { CrawlerConfig, CrawlerResponse, CrawlerOptions } from './types';
import rateLimit from 'axios-rate-limit';
import NodeCache from 'node-cache';

const BASE_URL = 'https://api.spider.cloud';

class Crawler {
  private axiosInstance: AxiosInstance;
  private cache: NodeCache;

  constructor(options: CrawlerOptions = {}) {
    this.axiosInstance = rateLimit(axios.create({
      baseURL: BASE_URL,
      headers: {
        'Authorization': `Bearer ${process.env.SPIDER_API_KEY}`,
        'Content-Type': 'application/json',
      },
      ...options,
    }), options.rateLimit || { maxRequests: 5, perSeconds: 60 });

    this.cache = new NodeCache({ stdTTL: 600 });
  }

  async crawl(config: CrawlerConfig): Promise<CrawlerResponse> {
    const cacheKey = JSON.stringify(config);
    const cachedResponse = this.cache.get<CrawlerResponse>(cacheKey);

    if (cachedResponse && config.cache !== false) {
      return cachedResponse;
    }

    try {
      const response = await this.axiosInstance.post<CrawlerResponse>('/crawl', config);
      if (config.cache !== false) {
        this.cache.set(cacheKey, response.data);
      }
      return response.data;
    } catch (error) {
      console.error('[Crawler] Crawl error:', error);
      throw error;
    }
  }
}

export { Crawler };
