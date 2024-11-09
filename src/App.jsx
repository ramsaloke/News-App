import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [articles, setArticles] = useState([]);
  const [query, setQuery] = useState("");

  // API key
  const API_KEY = "758fc8ae73894eea9abf6698ac0eef24";

  // Fetch top headlines on initial load
  useEffect(() => {
    fetchTopHeadlines();
  }, []);

  // Function to fetch top headlines
  const fetchTopHeadlines = async () => {
    try {
      const response = await fetch(
        `https://newsapi.org/v2/top-headlines?country=us&pageSize=12&apiKey=${API_KEY}`,
        {
          headers: {
            "User-Agent": "Mozilla/5.0",
            "Accept": "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      // Check for HTTP 426 or other errors
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      // Set articles if data exists
      if (data?.articles?.length > 0) {
        setArticles(data.articles);
      } else {
        console.error("No articles found or invalid response:", data);
        setArticles([]);
      }
    } catch (error) {
      console.error("Error fetching top headlines:", error);
      setArticles([]); // Reset articles if there's an error
    }
  };

  // Function to fetch articles based on query search
  const fetchArticlesByQuery = async () => {
    if (!query.trim()) return;

    try {
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&pageSize=12&apiKey=${API_KEY}`,
        {
          headers: {
            "User-Agent": "Mozilla/5.0",
            "Accept": "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      if (data?.articles?.length > 0) {
        setArticles(data.articles);
      } else {
        console.error("No articles found or invalid response:", data);
        setArticles([]);
      }
    } catch (error) {
      console.error("Error with search query:", error);
      setArticles([]);
    }
  };

  return (
    <div className="App">
      <nav>
        <div className="navbar obj-width">
          <a className="logo" href="/">
            Read News
          </a>
          <div className="search-container">
            <input
              type="text"
              placeholder="Search news here..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              id="search-input"
            />
            <button onClick={fetchArticlesByQuery} id="search-btn">
              Search
            </button>
          </div>
        </div>
      </nav>

      <main id="blog-container" className="obj-width">
        {articles.length > 0 ? (
          articles.map((article, index) => (
            <div
              key={index}
              className="blog-card"
              onClick={() => window.open(article.url, "_blank")}
            >
              <img
                src={article.urlToImage || "https://via.placeholder.com/150"}
                alt={article.title || "Article Image"}
              />
              <h2>
                {article.title?.length > 30
                  ? `${article.title.slice(0, 30)}...`
                  : article.title || "No title available"}
              </h2>
              <p>
                {article.description?.length > 100
                  ? `${article.description.slice(0, 100)}...`
                  : article.description || "No description available."}
              </p>
              <button
                className="read-more-btn"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent double click action
                  window.open(article.url, "_blank");
                }}
              >
                Read More
              </button>
            </div>
          ))
        ) : (
          <p>No articles found</p>
        )}
      </main>
    </div>
  );
}

export default App;
