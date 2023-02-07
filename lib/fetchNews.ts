import { gql } from "graphql-request";
import sortNewsByImage from "./sortNewsByImage";

const fetchNews = async (
  category?: Category | string,
  keywords?: string,
  isDynamic?: boolean
) => {
  const query = gql`
    query myQuery(
      $access_key: String!
      $categories: String!
      $keywords: String
    ) {
      myQuery(
        access_key: $access_key
        categories: $categories
        countries: "us"
        sort: "published_desc"
        keywords: $keywords
      ) {
        data {
          author
          category
          country
          description
          image
          language
          published_at
          source
          title
          url
        }
        pagination {
          limit
          offset
          total
          count
        }
      }
    }
  `;
  // fetch graph data
  const response = await fetch(
    "https://marica.stepzen.net/api/bailing-donkey/__graphql",
    {
      method: "POST",
      cache: isDynamic ? "no-cache" : "default",
      next: isDynamic ? { revalidate: 0 } : { revalidate: 20 },
      headers: {
        "Content-Type": "application/json",
        Authorization: `APIKey ${process.env.STEPZEN_API_KEY}`,
      },
      body: JSON.stringify({
        query,
        variables: {
          access_key: process.env.MEDIASTACK_API,
          categories: category,
          keywords: keywords,
        },
      }),
    }
  );

  // log data
  console.log(
    "LOADING NEW DATA FROM API for category >>> ",
    category,
    keywords
  );

  const newsResponse = await response.json();

  // cont.
  const news = sortNewsByImage(newsResponse.data.myQuery);
  return news;
};

// http://api.mediastack.com/v1/news?access_key=&sources=business,sports

export default fetchNews;
