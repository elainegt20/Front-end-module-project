'use client';

import React, { useState } from 'react';
import styles from './adminDashboard.module.css';
import { deleteUser, updateUser } from '../../actions/adminActions';

const USERS_PER_PAGE = 5;

const AdminDashboard = ({ usersList }) => {
  const [users, setUsers] = useState(usersList);
  const [editingId, setEditingId] = useState(null);
  const [plainTextPassword, setPlainTextPassword] = useState('');

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(users.length / USERS_PER_PAGE);
  const indexOfLastUser = currentPage * USERS_PER_PAGE;
  const indexOfFirstUser = indexOfLastUser - USERS_PER_PAGE;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const handlePasswordChange = (event) => {
    setPlainTextPassword(event.target.value);
  };

  const handleEdit = (id) => {
    setEditingId(id);
  };

  const handleSave = (id) => {
    setEditingId(null);
    // Here you would typically send the updated user data to your backend
    console.log(
      'Saved user:',
      users.find((user) => user.id === id),
    );
    const user = users.find((user) => user.id === id);

    console.log(' user', user);
    updateUser(id, user, plainTextPassword);
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  const handleChange = (id, field, value) => {
    setUsers(
      users.map((user) =>
        user.id === id ? { ...user, [field]: value } : user,
      ),
    );
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter((user) => user.id !== id));
      deleteUser(id);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Admin Dashboard</h1>
      <div className={styles.userList}>
        {currentUsers.map((user) => (
          <div key={user.id} className={styles.userItem}>
            {editingId === user.id ? (
              <>
                <input
                  type="text"
                  value={user.name}
                  onChange={(e) =>
                    handleChange(user.id, 'name', e.target.value)
                  }
                  className={styles.input}
                />
                <input
                  type="email"
                  value={user.email}
                  onChange={(e) =>
                    handleChange(user.id, 'email', e.target.value)
                  }
                  className={styles.input}
                />
                <input
                  type="password"
                  value={plainTextPassword}
                  onChange={handlePasswordChange}
                  className={styles.input}
                  placeholder="Password"
                />
                <select
                  value={user.role || 'User'}
                  onChange={(e) =>
                    handleChange(user.id, 'role', e.target.value)
                  }
                  className={styles.select}
                >
                  <option value="User">User</option>
                  <option value="Admin">Admin</option>
                </select>
                <div className={styles.buttonGroup}>
                  <button
                    onClick={() => handleSave(user.id)}
                    className={styles.saveButton}
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancel}
                    className={styles.cancelButton}
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className={styles.userInfo}>
                  <span className={styles.userName}>{user.name}</span>
                  <span className={styles.userEmail}>{user.email}</span>
                  <span className={styles.userRole}>{user.role}</span>
                  <span className={styles.userPassword}>
                    Password: *********
                  </span>
                </div>
                <div className={styles.buttonGroup}>
                  <button
                    onClick={() => handleEdit(user.id)}
                    className={styles.editButton}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className={styles.deleteButton}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
      <div className={styles.pagination}>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(
          (pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              className={`${styles.pageButton} ${currentPage === pageNumber ? styles.activePage : ''}`}
            >
              {pageNumber}
            </button>
          ),
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
