from spider import Spider
from pydantic import BaseModel
import json
from openai import OpenAI
import os
from collections.abc import MutableMapping
import pandas as pd
from dotenv import load_dotenv
import streamlit as st

load_dotenv()

client = OpenAI()
MODEL = "gpt-4-0125-preview"

def spider_cloud_scrape(url):
    # Initialize the Spider with your API key
    app = Spider(api_key="xxxx")
    
    # Crawl an entity
    crawler_params = {
        "limit": 1,
        "proxy_enabled": True,
        "store_data": False,
        "metadata": False,
        "request": "http",
        "return_format": "markdown",
    }
    
    try:
        scraped_data = app.crawl_url(url, params=crawler_params)
        print("Scraped data found")
        markdown = scraped_data[0]["content"]
        print(markdown)
        return scraped_data
    except Exception as e:
        print(e)
        markdown = "Error" + str(e)
        
    return markdown

def extract_data(raw_data: dict, response_format: str = "markdown") -> str:
    prompt = """
        You are a world class web scraper.
        You will extract data based on raw_content we crawl from an url"""
        
    response = client.beta.chat.completions.parse(
        model=MODEL, 
        messages= [
            {"role": "system", "content": prompt},
            {"role": "user", "content": f"RAW_CONTENT: {raw_data}"},
        ],
        response_format=response_format,
    )

    return json.loads(response.choices[0].message.content)

def url_to_data(url: str, response_format: str = "markdown") -> str:
    raw_data = spider_cloud_scrape(url)
    return extract_data(raw_data, response_format)


def flatten_json(nested_json: dict) -> dict:
    out = []

    def flatten(x: dict, name: str = '', parent_key: str = ''):
        if isinstance(x, MutableMapping):
            for a in x:
                flatten(x[a], name + a + '_', a)
        elif isinstance(x, list):
            for i, item in enumerate(x):
                flatten(item, name + parent_key + '_', parent_key)
        else:
            out.append((parent_key if parent_key else name[:-1], x))

    flatten(nested_json)
    return dict(out)

def flatten_json_array(json_data: list) -> pd.DataFrame:
    flattened_data = []

    for item in json_data:
        arrays_found = False

        # Split the key-value pairs into those with-lists and those without
        single_entries = {}
        array_entries = {}
        for key, value in item.items():
            if isinstance(value, list):
                array_entries[key] = value
                arrays_found = True
            else:
                single_entries[key] = value
        if arrays_found:
            for key, value_list in array_entries.items():
                for entry in value_list:
                    flattened_entry = flatten_json(entry)
                    combined_entry = {**single_entries, **flattened_entry}
                    flattened_data.append(combined_entry)
        else:
            flattened_data.append(single_entries)

    return flattened_data


class Price(BaseModel):
    size: str
    price: str

class MenuItem(BaseModel):
    name: str = Field(..., description="name of the menu item")
    ingredients: str = Field(
        ..., description="what ingredients does this menu item has?")
    prices: list[Price] = Field(..., description="prices of the menu item")

class Menu(BaseModel):
    menus: list[MenuItem]

st.title("Universal scraper")
url = st.text_input("Url", value="https://bravotrattoria.com.au/lunch-and-dinner-menu/")
if st.button("Scrape"):
    menu = url_to_data(url, Menu)
    df = pd.DataFrame(flatten_json_array(menu))
    print(df)

    st.data_editor(df, num_rows="dynamic")

# Example usage
if __name__ == "__main__":
    # Crawl a single page
    url = "https://bravotrattoria.com.au/lunch-and-dinner-menu/"
    data = url_to_data(url)
    print(data)

    # Crawl multiple pages (example with limit of 5)
    multi_page_data = spider_cloud_scrape(url, limit=5)
    print(json.dumps(multi_page_data, indent=2))

    # Example of flattening JSON
    nested_json = {"a": 1, "b": {"c": 2, "d": {"e": 3}}}
    flattened = flatten_json(nested_json)
    print(flattened)

    # Example of flattening JSON array
    json_array = [
        {"name": "John", "age": 30, "city": {"name": "New York", "country": "USA"}},
        {"name": "Alice", "age": 25, "city": {"name": "London", "country": "UK"}}
    ]
    df = flatten_json_array(json_array)
    print(df)