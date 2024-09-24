import { Typography } from '@mui/material';
import styles from './Home.module.css';
const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Typography variant="h1" className={styles.headerTitle}>
          Quiz Generator
        </Typography>
      </div>
    </header>
  );
};
export default Header;
