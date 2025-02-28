import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { adminContextObj } from "../../contexts/AdminContext";
import { getBaseUrl } from '../../utils/config';
import { FiUsers, FiUserCheck, FiUserX, FiLock, FiUnlock } from 'react-icons/fi';
import './UserList.css';

function UserList() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const { currentAdmin, setCurrentAdmin } = useContext(adminContextObj);

  async function toggleDisableEnable(userObj) {
    const updatedStatus = !userObj.isActive;
    userObj.isActive = updatedStatus;
    let res = await axios.put(
      `${getBaseUrl()}/admin-api/user/${userObj._id}`,
      { ...userObj }
    );
    if (res.data.message === "updated") {
      setCurrentAdmin(res.data.payload);
    }
  }

  //get all users
  async function getUsers() {
    let res = await axios.get(`${getBaseUrl()}/admin-api/users`);
    console.log("users for admin: ", res.data.payload);
    if (res.data.message === "users") {
      setUsers(res.data.payload);
      setError("");
    } else {
      setError(res.data.message);
    }
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="user-list-container">
      {error && <div className="error-message">{error}</div>}

      <div className="user-section">
        <h2 className="section-title">
          <FiUserCheck /> Active Users
        </h2>
        
        <div className="user-grid">
          {users.some((userObj) => userObj.isActive) ? (
            users.map(
              (userObj, i) =>
                userObj.isActive && (
                  <div className="user-card" key={i}>
                    <div className="user-header">
                      <img
                        src={userObj.profileImageUrl}
                        alt={userObj.firstName}
                        className="user-avatar"
                      />
                      <div className="user-info">
                        <h3 className="user-name">{userObj.firstName}</h3>
                        <p className="user-role">{userObj.role}</p>
                        <span className="user-status status-active">Active</span>
                      </div>
                    </div>
                    <div className="user-actions">
                      <button
                        className="btn-toggle btn-disable"
                        onClick={() => toggleDisableEnable(userObj)}
                      >
                        <FiLock /> Disable
                      </button>
                    </div>
                  </div>
                )
            )
          ) : (
            <div className="empty-state">
              <FiUsers size={24} />
              <p>No active users found</p>
            </div>
          )}
        </div>
      </div>

      <div className="user-section">
        <h2 className="section-title">
          <FiUserX /> Inactive Users
        </h2>
        
        <div className="user-grid">
          {users.some((userObj) => !userObj.isActive) ? (
            users.map(
              (userObj, i) =>
                !userObj.isActive && (
                  <div className="user-card" key={i}>
                    <div className="user-header">
                      <img
                        src={userObj.profileImageUrl}
                        alt={userObj.firstName}
                        className="user-avatar"
                      />
                      <div className="user-info">
                        <h3 className="user-name">{userObj.firstName}</h3>
                        <p className="user-role">{userObj.role}</p>
                        <span className="user-status status-inactive">Inactive</span>
                      </div>
                    </div>
                    <div className="user-actions">
                      <button
                        className="btn-toggle btn-enable"
                        onClick={() => toggleDisableEnable(userObj)}
                      >
                        <FiUnlock /> Enable
                      </button>
                    </div>
                  </div>
                )
            )
          ) : (
            <div className="empty-state">
              <FiUsers size={24} />
              <p>No inactive users found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserList;
