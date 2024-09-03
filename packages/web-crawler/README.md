#Getting Started with Spider API

Contents

Spider API Features
API Built to Scale
API Usage
Use Spider in LangChain or LlamaIndex
LangChain
LlamaIndex
Crawling One Page
Crawling Multiple Pages
Optimized Response Format for Large Language Models (LLM) and AI Agents
Planet Scale Crawling
Automatic Configuration
Get Started with Using the API
Spider API Features

Premium proxy rotations: No more headaches dealing with IP blocks.
Cost-effective: Crawl many pages for a fraction of the cost of what other services charge.
Full concurrency: Crawl thousands of pages in seconds. Yes, that isn’t a typo!
Smart mode: Ensure fast crawling while considering JavaScript-rendered pages into account using headless Chrome.
Caching: Repeated page crawls ensure a speed boost in your crawls.
Optimal response format: Get clean and formatted markdown, HTML, or text for LLM and AI agents.
Scrape with AI (Beta): Perform custom browser scripting and data extraction using the latest AI models.
Avoid anti-bot detection: Measures that further lower the chances of crawls being blocked.
And many more
API Built to Scale

Welcome to the fastest web crawler API. We want you to experience the full potential of our platform, which is why we have designed our API to be highly scalable and efficient.

Our platform is designed to effortlessly manage thousands of requests per second, thanks to our elastically scalable system architecture and the open-source Spider project. We deliver consistent latency times ensuring processing for all responses.

For an in-depth understanding of the request parameters supported, we invite you to explore our comprehensive API documentation. At present, we do not provide client-side libraries, as our API has been crafted with simplicity in mind for straightforward usage. However, we are open to expanding our offerings in the future to enhance user convenience.

Dive into our documentation to get started and unleash the full potential of our web crawler today.

API Usage

Getting started with the API is simple and straightforward. After you get your secret key, you can access our instance directly. Or if you prefer, you can use our client SDK libraries for Python and JavaScript. The crawler is highly configurable through the params to fit all needs and use cases when using the API directly or client libraries.

Use Spider in LangChain or LlamaIndex

LangChain

Documentation using Spider as a data loader (Python)
Javascript coming soon!
LlamaIndex

Documentation for using Spider as a web page reader
Crawling One Page

Most cases you probably just want to crawl one page. Even if you only need one page, our system performs fast enough to lead the race. The most straightforward way to make sure you only crawl a single page is to set the budget limit with a wildcard value or * to 1. You can also pass in the param limit in the JSON body with the limit of pages.

Crawling Multiple Pages

When you crawl multiple pages, the concurrency horsepower of the spider kicks in. You might wonder why and how one request may take (x)ms to come back, and 100 requests take about the same time! That’s because the built-in isolated concurrency allows for crawling thousands to millions of pages in no time. It’s the only current solution that can handle large websites with over 100k pages within a minute or two (sometimes even in a blink or two). By default, we do not add any limits to crawls unless specified.

Optimized Response Format for Large Language Models (LLM) and AI Agents

Get the response in markdown that is clean, easy to parse, and save on token cost when using LLMs.

import requests

json_data = {"return_format": "markdown", "url": "http://www.example.com", "limit": 5}

response = requests.post('https://api.spider.cloud/v1/crawl',
                         headers={'Authorization': 'Bearer YOUR_SECRET_KEY'},
                         json=json_data)

print(response.json())
Copy
Or if you prefer, you can get the response in raw HTML format or text only.

Planet Scale Crawling

If you plan on processing crawls that have over 200 pages, we recommend streaming the request from the client instead of parsing the entire payload once finished. We have an example of this with Python on the API docs page, also shown below.

import requests, os, json

headers = {
    'Authorization': os.environ["SPIDER_API_KEY"],
    'Content-Type': 'application/json',
}

json_data = {"limit": 250, "url": "http://www.example.com"}

response = requests.post('https://api.spider.cloud/v1/crawl',
                         headers=headers,
                         json=json_data,
                         stream=True)

for line in response.iter_lines():
    if line:
        print(json.loads(line))
Copy
Automatic Configuration

Spider handles automatic concurrency handling, proxy rotations (if enabled), anti-bot measures, and more.

Get Started with Using the API

Add credits to your account balance. The more credits you have or usage available allows for a higher concurrency limit.
Create an API key.
Enable Auto Refill usage.
Thanks for using Spider! We are excited to see what you build with our API. If you have any questions or need help, please contact us through the feedback form.

Build now, scale to millions

Start now
Company
About
Privacy
Terms
FAQ
Resources
API
Guides
Docs
Services
Pricing
Web Crawling and Scraping
All systems normal.
GitHub
Discord
Twitter