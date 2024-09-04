const { crawlArxiv } = require('../src/arxiv-crawler');
const { Crawler } = require('../src/crawler');

// Mock the Crawler class
jest.mock('../src/crawler');

describe('arXiv Crawler', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  it('should crawl arXiv and return formatted markdown', async () => {
    // Mock the crawl method to return a sample response
    (Crawler.prototype.crawl as jest.Mock).mockResolvedValue({
      content: 'Title 1\nAuthors 1\nTitle 2\nAuthors 2',
      metadata: { someMetadata: 'value' }
    });

    const result = await crawlArxiv();
    
    // Check if the result is a non-empty string
    expect(result).toBeTruthy();
    expect(typeof result).toBe('string');
    
    // Check if the result contains markdown headers and author information
    expect(result).toContain('## Title 1');
    expect(result).toContain('Authors: Authors 1');
    expect(result).toContain('## Title 2');
    expect(result).toContain('Authors: Authors 2');
    
    // Check if the Crawler was called with the correct configuration
    expect(Crawler.prototype.crawl).toHaveBeenCalledWith(expect.objectContaining({
      url: 'https://arxiv.org/list/cs.AI/recent',
      request: 'http',
      return_format: 'markdown',
      readability: true,
      metadata: true,
      css_extraction_map: {
        'title': 'dt.list-title',
        'authors': 'div.list-authors',
      },
    }));
  });

  it('should handle errors gracefully', async () => {
    // Mock the crawl method to throw an error
    (Crawler.prototype.crawl as jest.Mock).mockRejectedValue(new Error('Crawl failed'));

    await expect(crawlArxiv()).rejects.toThrow('Crawl failed');
  });

  it('should handle empty response', async () => {
    // Mock the crawl method to return an empty response
    (Crawler.prototype.crawl as jest.Mock).mockResolvedValue({
      content: '',
      metadata: {}
    });

    const result = await crawlArxiv();
    expect(result).toBe('');
  });
});
