import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { userAuthorContextObj } from "../../contexts/UserAuthorContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getBaseUrl } from '../../utils/config';
import { FiEdit3, FiSend } from 'react-icons/fi';
import './PostArticle.css';

function PostArticle() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { currentUser } = useContext(userAuthorContextObj);

  async function postArticle(articleObj) {
    const authorData = {
      nameOfAuthor: currentUser.firstName,
      email: currentUser.email,
      profileImageUrl: currentUser.profileImageUrl,
    };
    articleObj.authorData = authorData;
    articleObj.articleId = Date.now();

    let currentDate = new Date();
    articleObj.dateOfCreation =
      currentDate.getDate() +
      "-" +
      currentDate.getMonth() +
      "-" +
      currentDate.getFullYear() +
      " " +
      currentDate.toLocaleTimeString("en-US", { hour12: true });

    articleObj.dateOfModification =
      currentDate.getDate() +
      "-" +
      currentDate.getMonth() +
      "-" +
      currentDate.getFullYear() +
      " " +
      currentDate.toLocaleTimeString("en-US", { hour12: true });

    articleObj.comments = [];
    articleObj.isArticleActive = true;

    let res = await axios.post(
      `${getBaseUrl()}/author-api/article`,
      articleObj
    );
    if (res.status === 201) {
      navigate(`/author-profile/${currentUser.email}/articles`);
    }
  }

  return (
    <div className="post-article-container">
      <div className="post-article-card">
        <div className="post-article-header">
          <h2><FiEdit3 /> Create New Article</h2>
        </div>
        <div className="post-article-body">
          <form onSubmit={handleSubmit(postArticle)}>
            <div className="form-group">
              <label htmlFor="title" className="form-label">
                Article Title
              </label>
              <input
                type="text"
                id="title"
                className="form-input"
                {...register("title", { required: "Title is required" })}
                placeholder="Enter a captivating title..."
              />
              {errors.title && (
                <span className="error-message">{errors.title.message}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="category" className="form-label">
                Category
              </label>
              <select
                {...register("category", { required: "Please select a category" })}
                id="category"
                className="form-select"
                defaultValue=""
              >
                <option value="" disabled>Select category...</option>
                <option value="programming">Programming</option>
                <option value="AI&ML">AI & Machine Learning</option>
                <option value="database">Database</option>
              </select>
              {errors.category && (
                <span className="error-message">{errors.category.message}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="content" className="form-label">
                Article Content
              </label>
              <textarea
                {...register("content", { required: "Content is required" })}
                id="content"
                className="form-textarea"
                placeholder="Write your article content here..."
                rows="10"
              ></textarea>
              {errors.content && (
                <span className="error-message">{errors.content.message}</span>
              )}
            </div>

            <div className="text-end">
              <button type="submit" className="add-article-btn">
                <FiSend /> Publish Article
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PostArticle;
