'use client';

import { Typography } from '@mui/material';
import UtilButton from '../Button/Button';
import { useRouter } from 'next/navigation';
import UserMenu from './UserMenu';
import styles from './TopNav.module.css';
import Link from 'next/link';

const TopNavClient = ({ session }) => {
  const router = useRouter();

  const goToLogin = () => {
    router.push('/authPage/login');
  };

  const goToRegistration = () => {
    router.push('/authPage/register');
  };

  const goToUserQuizzes = () => {
    router.push('/quizzesPage');
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Typography variant="h1" className={styles.headerTitle}>
          <Link
            href="/uploadNotesPage"
            style={{ color: 'white', textDecoration: 'none' }}
          >
            Quiz Generator
          </Link>
        </Typography>

        <div className={styles.navListContainer}>
          {session?.user ? (
            (console.log(session.user),
            (
              <>
                <UtilButton
                  onClick={goToUserQuizzes}
                  color="white"
                  backgroundColor="black"
                >
                  My Quizzes
                </UtilButton>
                <UserMenu user={session.user} />
              </>
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
