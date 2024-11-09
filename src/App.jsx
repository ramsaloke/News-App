
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [articles, setArticles] = useState([]);
  const [query, setQuery] = useState("");
  
  
  const API_KEY = import.meta.env.VITE_API_KEY
  

  useEffect(() => {
    fetchTopHeadlines();
  }, []);

  const fetchTopHeadlines = async () => {
    try {
      const response = await fetch(
       `https://newsapi.org/v2/top-headlines?country=us&pageSize=12&apikey=${API_KEY}`
      );
      const data = await response.json();
      setArticles(data.articles);
    } catch (error) {
      console.error("Error fetching top headlines:", error);
    }
  };

  const fetchArticlesByQuery = async () => {
    if (!query.trim()) return;
    try {
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=${query}&pageSize=12&apikey=${API_KEY}`
      );
      const data = await response.json();
      setArticles(data.articles);
    } catch (error) {
      console.error("Error with search query:", error);
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
              placeholder="Search news here.."
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
                src={article.urlToImage || "https://plus.unsplash.com/premium_photo-1691223714882-57a432c4edaf?q=80&w=1781&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                alt={article.title}
              />
              <h2>
                {article.title.length > 30
                  ? `${article.title.slice(0, 30)}...`
                  : article.title}
              </h2>
              <p>
              {article.description && article.description.length > 100
  ? `${article.description.slice(0, 100)}...`
  : article.description}

                <button
                  className="read-more-btn"
                  onClick={() => window.open(article.url, "_blank")}
                >
                  Read More
                </button>
              </p>
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
