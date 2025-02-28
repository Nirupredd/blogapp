import React from "react";
import { Link, Outlet } from "react-router-dom";
import { FiUsers, FiSettings, FiActivity } from 'react-icons/fi';
import './AdminProfile.css';

function AdminProfile() {
  return (
    <div className="admin-dashboard">
      <div className="admin-sidebar">
        <div className="admin-nav">
          <Link to="users" className="admin-nav-item">
            <FiUsers className="admin-nav-icon" />
            <span>Users</span>
          </Link>
          <Link to="analytics" className="admin-nav-item">
            <FiActivity className="admin-nav-icon" />
            <span>Analytics</span>
          </Link>
          <Link to="settings" className="admin-nav-item">
            <FiSettings className="admin-nav-icon" />
            <span>Settings</span>
          </Link>
        </div>
      </div>
      
      <div className="admin-content">
        <div className="admin-header">
          <h1>Admin Dashboard</h1>
          <div className="admin-breadcrumb">
            Home / Dashboard
          </div>
        </div>
        
        <div className="admin-main">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminProfile;
