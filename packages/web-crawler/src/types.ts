import { AxiosRequestConfig } from 'axios';

export interface CssExtractionRule {
  selector: string;
  type: 'TEXT' | 'HTML' | 'ATTRIBUTE';
  attribute?: string;
}

export interface CrawlerConfig {
  url: string;
  limit?: number;
  request?: 'http' | 'chrome' | 'smart';
  return_format?: 'markdown' | 'commonmark' | 'raw' | 'text' | 'bytes' | 'json';
  readability?: boolean;
  metadata?: boolean;
  css_extraction_map?: Record<string, Array<{ name: string; selectors: string[] }>>;
  wait_for?: {
    idle_network?: { timeout?: { secs: number; nanos: number } };
    selector?: { timeout?: { secs: number; nanos: number }; selector: string };
    delay?: { timeout?: { secs: number; nanos: number } };
    page_navigations?: boolean;
  };
  automation_scripts?: Record<string, string>;
  chunking_alg?: { type: 'bywords' | 'bylines' | 'bycharacterlength' | 'bysentence'; value: number };
  cache?: boolean;
  proxy_enabled?: boolean;
  anti_bot?: boolean;
  store_data?: boolean;
}

export interface CrawlerResponse {
  content?: string;
  metadata?: Record<string, any>;
  links?: string[];
}

export interface RateLimitConfig {
  maxRequests: number;
  perSeconds: number;
}

export interface CrawlerOptions extends AxiosRequestConfig {
  rateLimit?: RateLimitConfig;
}