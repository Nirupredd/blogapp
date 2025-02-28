import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import { useForm } from "react-hook-form";
import { FiPlus, FiClock, FiBookOpen } from 'react-icons/fi';
import { getBaseUrl } from '../../utils/config';
import './Articles.css';

function Articles() {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { getToken } = useAuth();
  const {
    register,
    watch,
  } = useForm();
  const selectedCategory = watch("category") || "All";
  const { currentUser } = useAuth();

  async function getArticles() {
    try {
      const token = await getToken();
      let res = await axios.get(`${getBaseUrl()}/author-api/articles`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data.message === "articles") {
        setArticles(res.data.payload);
        setError("");
      } else {
        setError(res.data.message);
      }
    } catch (err) {
      setError("Failed to fetch articles. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  function goToArticleById(articleObj) {
    navigate(`../${articleObj.articleId}`, { state: articleObj });
  }

  useEffect(() => {
    getArticles();
  }, []);

  return (
    <div className="articles-container">
      {error && <div className="error-message">{error}</div>}

      <div className="filter-section">
        <select
          {...register("category")}
          className="category-select"
          defaultValue="All"
        >
          <option value="All">All Categories</option>
          <option value="programming">Programming</option>
          <option value="AI&ML">AI & Machine Learning</option>
          <option value="database">Database</option>
        </select>
      </div>

      {loading ? (
        <div className="loading-grid">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div key={n} className="skeleton-card" />
          ))}
        </div>
      ) : (
        <div className="article-grid">
          {articles.map(
            (articleObj) =>
              (selectedCategory === "All" ||
                articleObj.category === selectedCategory) && (
                <div className="article-card" key={articleObj.articleId}>
                  <div className="card-body">
                    <div className="author-details">
                      <img
                        src={articleObj.authorData.profileImageUrl}
                        alt={articleObj.authorData.nameOfAuthor}
                        className="author-avatar"
                      />
                      <p className="author-name">
                        {articleObj.authorData.nameOfAuthor}
                      </p>
                    </div>
                    <h3 className="card-title">{articleObj.title}</h3>
                    <p className="card-content">
                      {articleObj.content.substring(0, 150)}...
                    </p>
                    <button
                      className="read-more-btn"
                      onClick={() => goToArticleById(articleObj)}
                    >
                      <FiBookOpen /> Read More
                    </button>
                  </div>
                  <div className="card-footer">
                    <FiClock /> Last updated: {articleObj.dateOfModification}
                  </div>
                </div>
              )
          )}
        </div>
      )}

      {currentUser?.role === 'author' && (
        <button 
          className="new-article-btn"
          onClick={() => navigate('/post-article')}
          title="Write new article"
        >
          <FiPlus />
        </button>
      )}
    </div>
  );
}

export default Articles;
