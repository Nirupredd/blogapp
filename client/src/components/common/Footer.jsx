import React from "react";
import { Link } from "react-router-dom";
import { FiGithub, FiTwitter, FiLinkedin, FiMail, FiHome, FiInfo, FiPhone, FiCode, FiCoffee, FiMap, FiHelpCircle, FiShield } from 'react-icons/fi';
import logo from "../../assets/logo.png";
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-wave"></div>
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-main">
            <Link to="/" className="footer-logo">
              <img
                src={logo}
                width="100px"
                alt="logo"
              />
              <span className="footer-brand">LUMINARY</span>
            </Link>
            <p className="footer-description">
              A platform for sharing knowledge, stories, and ideas. Join our community
              of writers and readers to explore diverse perspectives and expand your horizons.
            </p>
            <div className="footer-socials">
              <a href="https://github.com/" className="social-icon" aria-label="Github" target="_blank" rel="noopener noreferrer">
                <FiGithub />
              </a>
              <a href="https://x.com/" className="social-icon" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
                <FiTwitter />
              </a>
              <a href="https://www.linkedin.com/in/" className="social-icon" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                <FiLinkedin />
              </a>
              <a href="mailto:saihari799@gmail.com" className="social-icon" aria-label="Email">
                <FiMail />
              </a>
            </div>
          </div>
          <div className="footer-section">
            <h3 className="footer-section-title">Quick Links</h3>
            <div className="footer-links">
              <div className="footer-link">
                <Link to="/"><FiHome /> Home</Link>
              </div>
              <div className="footer-link">
                <Link to="/"><FiInfo /> About</Link>
              </div>
              <div className="footer-link">
                <Link to="/"><FiPhone /> Contact: +91 8897410780</Link>
              </div>
            </div>
          </div>
          <div className="footer-section">
            <h3 className="footer-section-title">Categories</h3>
            <div className="footer-links">
              <div className="footer-link">
                <Link to="/"><FiCode /> Technology</Link>
              </div>
              <div className="footer-link">
                <Link to="/"><FiCoffee /> Lifestyle</Link>
              </div>
              <div className="footer-link">
                <Link to="/"><FiMap /> Travel</Link>
              </div>
            </div>
          </div>
          <div className="footer-section">
            <h3 className="footer-section-title">Support</h3>
            <div className="footer-links">
              <div className="footer-link">
                <Link to="/"><FiHelpCircle /> FAQ</Link>
              </div>
              <div className="footer-link">
                <Link to="/"><FiShield /> Privacy Policy</Link>
              </div>
              <div className="footer-link">
                <Link to="/"><FiShield /> Terms of Service</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="footer-copyright">
              © {new Date().getFullYear()} LUMINARY. All rights reserved.
            </p>
            <div className="footer-bottom-links">
              <Link to="/" className="footer-bottom-link">
                Privacy Policy
              </Link>
              <Link to="/" className="footer-bottom-link">
                Terms of Service
              </Link>
              <Link to="/" className="footer-bottom-link">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
