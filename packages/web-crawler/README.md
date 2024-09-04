API Reference
The Spider API is based on REST. Our API is predictable, returns JSON-encoded responses, uses standard HTTP response codes, authentication, and verbs. Set your API secret key in the authorization header to commence with the format Bearer $TOKEN. You can use the content-type header with application/json, application/xml, text/csv, and application/jsonl for shaping the response.
The Spider API supports multi domain actions. You can work with multiple domains per request by adding the urls comma separated.
The Spider API differs for every account as we release new versions and tailor functionality. You can add v1 before any path to pin to the version. Executing a request on the page by pressing the Run button will consume live credits and consider the response as a genuine result.
Just getting started?
Check out our development quickstart guide.
Not a developer?
Use Spiders no-code options or apps to get started with Spider and to do more with your Spider account no code required.
BASE URL

JSON
Copy
https://api.spider.cloud
CLIENT LIBRARIES
CLI
Javascript
Python
Rust
Crawl websites
Start crawling a website(s) to collect resources.
POSThttps://api.spider.cloud/crawl
Run
AI Configure
Request body
url REQUIRED string
The URI resource to crawl. This can be a comma split list for multiple urls.
Internet icon
To reduce latency, enhance performance, and save on RPM batch multiple URLs into a single call. For large websites with high page limits, it's best to run requests individually.
Test Url
limit number
The maximum amount of pages allowed to crawl per website. Remove the value or set it to 0 to crawl all pages.
Limit icon
It is better to set a limit upfront on websites where you do not know the size. Re-crawling can effectively use cache to keep costs low as new pages are found.
Crawl Limit
request string
The request type to perform. Possible values are http, chrome, and smart. Use smart to perform HTTP request by default until JavaScript rendering is needed for the HTML.
Request icon
The request greatly influences how the output is going to look. If the page is server-side rendered, you can stick to the defaults for the most part.

HTTP
return_format string
The format to return the data in. Possible values are markdown, commonmark, raw, text, and bytes. Use raw to return the default format of the page like HTML etc.
Return format icon
Usually you want to use markdown for LLM processing or text. If you need to store the files without losing any encoding, use the bytes or raw format.

Markdown
readability boolean
Use readability to pre-process the content for reading. This may drastically improve the content for LLM usage.
Safari Reader icon
This uses the Safari Reader Mode algorithm to extract only important information from the content.
SET EXAMPLE
metadata boolean
Collect metadata about the content found like page title, description, keywards and etc. This could help improve AI interoperability. Defaults to false unless you have the website already stored with the configuration enabled.
metadata icon
Using metadata can help extract critical information to use for AI.
SET EXAMPLE
anti_bot boolean
Enable anti-bot mode using various techniques to increase the chance of success. Default is false.
Anti Bot icon
This config will attempt to make request resemble a real human. If the request fails on chrome it will retry using a virtual display for the request that is slower difficult to block at the cost of speed.
SET EXAMPLE
css_extraction_map object
Use CSS query selectors to scrape contents from the web page. Set the paths and the CSS extraction object map to perform extractions per path or page.
CSS Scraping icon
Scrape content using CSS or XPATH selectors to get data. You can scrape using selectors at no extra cost.
SET EXAMPLE
store_data boolean
Determine whether to store data. If set this takes precedence over storageless. Defaults to false.
Store data icon
Set to true to collect resources to download and re-use later on.
SET EXAMPLE
tld boolean
Allow TLD's to be included. Default is false.
SET EXAMPLE
depth number
The crawl limit for maximum depth. If 0, no limit will be applied.
Depth icon
Depth allows you to place a distance between the base URL path and subfolders.
Crawl DepthSET EXAMPLE
cache boolean
Use HTTP caching for the crawl to speed up repeated runs. Default is true.
Cache enabled icon
Enabling caching can save costs when you need to perform transformations on different files or handle various events on a website.
SET EXAMPLE
delay number
Add a crawl delay of up to 60 seconds, disabling concurrency. The delay needs to be in milliseconds format. The default is 0, which indicates it is disabled.
turtle icon
Using a delay can help with websites that are set on a cron and do not require immediate data retrieval.
SET EXAMPLE
budget object
Object that has paths with a counter for limiting the amount of pages example {"*":1} for only crawling the root page. The wildcard matches all routes and you can set child paths preventing a depth level, example of limiting { "/docs/colors": 10, "/docs/": 100 } which only allows a max of 100 pages if the route matches /docs/:pathname and only 10 pages if it matches /docs/colors/:pathname.
Budget icon
The budget explicitly allows you to set paths and limits for the crawl.
Show More
Crawl Budget
SET EXAMPLE
scroll number
Infinite scroll the page as new content loads, up to a duration in milliseconds. The duration represents the maximum time you would wait to scroll. You may still need to use the wait_for parameters. You also need to ensure that the request is made using chrome.
Mouse Scroll icon
Use the wait_for configuration to scroll until and disable_intercept to make sure you get data from the network regardless of hostname.
SET EXAMPLE
locale string
The locale to use for request, example en-US.
SET EXAMPLE
cookies string
Add HTTP cookies to use for request.
cookie icon
Set the cookie value for pages that use SSR authentication.
SET EXAMPLE
stealth boolean
Use stealth mode for headless chrome request to help prevent being blocked. The default is false on chrome.
Stealth icon
Set to true to almost guarantee not being detected by anything.
SET EXAMPLE
headers object
Forward HTTP headers to use for all request. The object is expected to be a map of key value pairs.
HTTP icon
Using HTTP headers can help with authenticated pages that use the authorization header field.
SET EXAMPLE
sitemap boolean
Include the sitemap results to crawl. The default is false.
Sitemap icon
The sitemap allows you to include links that may not be exposed in the HTML.
SET EXAMPLE
viewport object
Configure the viewport for chrome. Defaults to 800x600.
Window viewport icon
If you need to get data from a website as a mobile, set the viewport to a phone device's size ex: 375x414.
SET EXAMPLE
encoding string
The type of encoding to use like UTF-8, SHIFT_JIS, or etc.
Encoding icon
Perform the encoding on the server when you know in advance the type of website.
SET EXAMPLE
wait_for object
The wait_for parameter allows you to specify various waiting conditions for a website operation. If provided, it contains the following sub-parameters:
The key idle_network specifies the conditions to wait for the network to be idle. It can include an optional timeout value.
The key selector specifies the conditions to wait for a particular CSS selector to be found on the page. It includes an optional timeout value, and the CSS selector to wait for.
The key delay specifies a delay to wait for, with an optional timeout value.
The key page_navigationsset to true then waiting for all page navigations will be handled.
If wait_for is not provided, the default behavior is to wait for the network to be idle for 500 milliseconds. All of the durations are capped at capped at 60 seconds.
The values for the timeout duration are in the object shape { secs: 10, nanos: 0 }.
Show More
SET EXAMPLE
blacklist array
Blacklist a set of paths that you do not want to crawl. You can use Regex patterns to help with the list.
SET EXAMPLE
whitelist array
Whitelist a set of paths that you want to crawl, ignoring all other routes that do not match the patterns. You can use regex patterns to help with the list.
SET EXAMPLE
subdomains boolean
Allow subdomains to be included. Default is false.
SET EXAMPLE
user_agent string
Add a custom HTTP user agent to the request. By default this is set to a random agent.
SET EXAMPLE
gpt_config object
Use AI to generate actions to perform during the crawl. You can pass an array for the prompt to chain steps.
OpenAI icon
Perform event-driven browser actions on a web page or extract data using the gpt_config, you need to use your own API key or have at least $100 in credits to use AI.
SET EXAMPLE
fingerprint boolean
Use advanced fingerprint detection for chrome.
Fingerprint icon
Set this value to help crawl when websites require a fingerprint.
SET EXAMPLE
storageless boolean
Prevent storing any type of data for the request including storage. Defaults to true unless you have the website already stored.
SET EXAMPLE
chunking_alg object
Use a chunking algorithm to segment your content output. Possible values are ByWords, ByLines, ByCharacterLength, and BySentence. The following is an example of the object shape for "chunking_alg": { "type": "bysentence", "value": 2 } which splits the text into an array by every 2 sentences found. This works well when used with markdown or text formats.
Chunking icon
The chunking algorithm allows you to prepare the content for the AI quick, without needing to add extra code or loaders.
Show More
SET EXAMPLE
country_code string
Set a ISO country code for premium proxy connections, this only works for HTTP request at the moment. You need to also use proxy_enabled.
Country Flag icon
The country code allows you to run requests in regions where access to the website is restricted to within that specific region.
SET EXAMPLE
root_selector string
The CSS query selector to use when extracting content from the markup.
Test Query Selector
page_insights boolean
Gather page insights like request duration, accessibility, and other vitals. The default is false and the param requires metadata to be used in conjunction.
Insights icon
Page Insights provides a quick, high-level alternative to Google's PageSpeed.
SET EXAMPLE
return_headers boolean
Return the HTTP response headers with the results. Defaults to false unless you have the website already stored with the configuration enabled.
HTTP icon
Getting the HTTP headers can help setup authentication flows.
SET EXAMPLE
return_cookies boolean
Return the HTTP response cookies with the results. Defaults to false unless you have the website already stored with the configuration enabled.
cookie icon
Getting the HTTP cookies can help setup authentication SSR flows.
SET EXAMPLE
respect_robots boolean
Respect the robots.txt file for crawling. Default is true.
Robots icon
If you have trouble crawling a website it may be an issue with the robots.txt file. Setting the value to false could help. Make sure to use this config sparingly.
SET EXAMPLE
full_resources boolean
Crawl and download all the resources for a website.
Resource icon
Collect all the content from the website, including assets like images, videos, etc.
SET EXAMPLE
request_timeout number
The timeout to use for request. Timeouts can be from 5-60. The default is 30 seconds.
Timeout icon
The timeout of the request helps prevent long request times from hanging.
SET EXAMPLE
external_domains array
A list of external domains to include into the domain results. You can use regex paths to include the domains. Set one of the array values to * to include all domains.
SET EXAMPLE
return_page_links boolean
Return the links found on each page. Defaults to false unless you have the website already stored with the configuration enabled.
Links icon
Getting the links can help index the reference locations found for the resource.
SET EXAMPLE
return_embeddings boolean
Include OpenAI embeddings for title and description. The default is false and the param requires metadata to be used in conjunction.
Embeddings icon
If you are embedding data, you can use these matrices as staples for most vector baseline operations.
SET EXAMPLE
execution_scripts object
Run custom JavaScript on certain paths. This helps with authenticated pages. The request mode to be made through chrome or smart to run. The values for the timeout duration should be in the object shape "/path_or_url": "custom js".
Javascript icon
Custom scripts allow you to take control of the browser with events for up to 60 seconds at a time per page.
SET EXAMPLE
disable_intercept boolean
Disable request interception when running request as chrome or smart. This may help if you bypass pages that use third-party scripts or external domains. The default setting is false. Note that cost and speed will increase when disabling this feature, as it removes our native Chrome interception.
SET EXAMPLE
run_in_background boolean
Run the request in the background. Useful if storing data and wanting to trigger crawls to the dashboard. This has no effect if storageless is set.
SET EXAMPLE
skip_config_checks boolean
Skip checking the database for website configuration. This may increase performance for request that are using limit=1. The default is false.
SET EXAMPLE
automation_scripts object
Run custom web automated tasks on certain paths. The request mode to be made through chrome or smart to run.
Automation icon
Custom web automation allows you to take control of the browser with events for up to 60 seconds at a time per page.
Below are the available actions for web automation:
Evaluate: Runs custom JavaScript code.
{ "Evaluate": "console.log('Hello, World!');" }
Click: Clicks on an element identified by a CSS selector.
{ "Click": "button#submit" }
Wait: Waits for a specified duration in milliseconds.
{ "Wait": 2000 }
WaitForNavigation: Waits for the next navigation event.
{ "WaitForNavigation": true }
WaitFor: Waits for an element to appear identified by a CSS selector.
{ "WaitFor": "div#content" }
WaitForAndClick: Waits for an element to appear and then clicks on it, identified by a CSS selector.
{ "WaitForAndClick": "button#loadMore" }
ScrollX: Scrolls the screen horizontally by a specified number of pixels.
{ "ScrollX": 100 }
ScrollY: Scrolls the screen vertically by a specified number of pixels.
{ "ScrollY": 200 }
Fill: Fills an input element with a specified value.
{ "Fill": { "selector": "input#name", "value": "John Doe" } }
InfiniteScroll: Scrolls the page until the end for certain duration.
{ "InfiniteScroll": 3000 }
Show More
SET EXAMPLE
proxy_enabled boolean
Enable premium proxies to prevent detection. Default is false.
Proxy enabled icon
Using this configuration can help when request are blocked through the network. This allows more advanced proxies with AI.
SET EXAMPLE