import requests

def getHeadlines(country='kr'):
    api_key = 'f8f48014355e4d68b1c643401cf44e98'
    if not api_key:
        raise ValueError("Please set the NEWS_API_KEY environment variable")

    pageSize = 100
    page = 1
    headlines = []
    url = f'https://newsapi.org/v2/top-headlines?country={country}&pageSize={pageSize}&apiKey={api_key}'

    try:
        while len(headlines) < 100:
            response = requests.get(f'{url}&page={page}')
            response.raise_for_status()  # Raise an HTTPError for bad responses (4xx and 5xx)
            news_list = response.json().get('articles', [])
            if not news_list:
                break  # No more articles to fetch

            for article in news_list:
                title = article['title']
                if title:
                    title_parts = title.split(' - ')
                    company = title_parts.pop() if len(title_parts) > 1 else 'NULL'
                    headlines.append({
                        'title': ' - '.join(title_parts),
                        'company': company,
                        'newsLink': article.get('url'),
                        'date': article.get('publishedAt'),
                        'img': article.get('urlToImage')
                    })

            if len(news_list) < pageSize:
                break  # Fewer articles than page size indicates end of results

            page += 1

        return headlines  # Return exactly 100 articles

    except requests.exceptions.RequestException as e:
        print(f"An error occurred: {e}")
        return []