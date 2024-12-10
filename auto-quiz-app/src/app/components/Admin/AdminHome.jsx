'use client';
import React, { useState, useEffect } from 'react';
import styles from './AdminHome.module.css';

const AdminHome = () => {
  const [greeting, setGreeting] = useState('');
  const fullGreeting = 'Welcome, Admin!';

  useEffect(() => {
    const timer = setTimeout(() => {
      setGreeting(fullGreeting.substring(0, greeting.length + 1));
    }, 100);

    return () => clearTimeout(timer);
  }, [greeting]);

  return (
    <div className={styles.cuteContainer}>
      <div className={styles.content}>
        <div className={styles.adminIcon}>👋</div>
        <h1 className={styles.welcomeText}>{greeting}</h1>
        <p className={styles.subtitle}>Hope your having a wonderful day!</p>
      </div>
    </div>
  );
};

export default AdminHome;
