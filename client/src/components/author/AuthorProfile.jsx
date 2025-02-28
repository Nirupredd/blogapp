import React, { useContext } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { userAuthorContextObj } from "../../contexts/UserAuthorContext";
import { FiFileText, FiPlusCircle, FiAlertCircle } from 'react-icons/fi';
import './AuthorProfile.css';

function AuthorProfile() {
  const { currentUser } = useContext(userAuthorContextObj);
  const location = useLocation();
  const isActiveRoute = (path) => location.pathname.includes(path);

  return (
    <div className="author-profile">
      <div className="author-header">
        <h1>Author Dashboard</h1>
      </div>

      <nav className="author-nav">
        <NavLink 
          to="articles" 
          className={`nav-link ${isActiveRoute('articles') ? 'active' : ''}`}
        >
          <FiFileText className="nav-link-icon" />
          <span>My Articles</span>
        </NavLink>
        <NavLink 
          to="article" 
          className={`nav-link ${isActiveRoute('article') ? 'active' : ''}`}
        >
          <FiPlusCircle className="nav-link-icon" />
          <span>Create New Article</span>
        </NavLink>
      </nav>

      {currentUser.isActive ? (
        <div className="author-content">
          <Outlet />
        </div>
      ) : (
        <div className="inactive-message">
          <FiAlertCircle className="inactive-icon" />
          <p>Your account is currently inactive. Please contact support for assistance.</p>
        </div>
      )}
    </div>
  );
}

export default AuthorProfile;
