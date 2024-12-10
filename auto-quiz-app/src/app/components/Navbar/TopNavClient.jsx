'use client';
import React from 'react';
import { Typography } from '@mui/material';
import UtilButton from '../Button/Button';
import { useRouter } from 'next/navigation';
import UserMenu from './UserMenu';
import styles from './TopNav.module.css';
import Link from 'next/link';

const TopNavClient = ({ session }) => {
  const router = useRouter();

  const UserLinks = [{ href: '/quizzesPage', label: 'My Quizzes' }];

  const adminLinks = [
    {
      href: '/adminPage/dashboardPage',
      label: 'Profiles Dashboard',
    },
  ];

  const goToLogin = () => {
    router.push('/authPage/login');
  };

  const goToRegistration = () => {
    router.push('/authPage/register');
  };

  const goToPage = (page) => {
    router.push(page);
  };

  const links = session?.user.role === 'ADMIN' ? adminLinks : UserLinks;

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Typography variant="h1" className={styles.headerTitle}>
          <Link
            href={
              links === adminLinks ? '/adminPage/homePage' : '/uploadNotesPage'
            }
            style={{ color: 'white', textDecoration: 'none' }}
          >
            Quiz Generator
          </Link>
        </Typography>

        <div className={styles.navListContainer}>
          {session?.user ? (
            links.map((item) => (
              <React.Fragment key={item.href}>
                <UtilButton
                  onClick={() => goToPage(item.href)}
                  color="white"
                  backgroundColor="black"
                >
                  {item.label}
                </UtilButton>
                <UserMenu user={session.user} />
              </React.Fragment>
            ))
          ) : (
            <>
              <UtilButton
                onClick={goToLogin}
                color="black"
                backgroundColor="white"
              >
                Login
              </UtilButton>
              <UtilButton
                onClick={goToRegistration}
                color="black"
                backgroundColor="white"
              >
                Register
              </UtilButton>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default TopNavClient;
