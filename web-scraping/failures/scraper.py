import requests
from bs4 import BeautifulSoup

# Send a GET request to the website
url = "http://example.com"  # Replace with the URL of the website you want to scrape
response = requests.get(url)

# Parse the HTML content using Beautiful Soup
soup = BeautifulSoup(response.content, "html.parser")

# Find and extract specific elements from the HTML
# Replace these lines with the elements you want to scrape
title = soup.find("h1").text
paragraphs = soup.find_all("p")

# Print the scraped data
print("Title:", title)
print("Paragraphs:")
for p in paragraphs:
    print("-", p.text)

