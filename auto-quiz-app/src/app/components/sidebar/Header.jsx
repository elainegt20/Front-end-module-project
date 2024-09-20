import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import Link from 'next/link';

import styles from './SideBar.module.css';

const Header = () => {
  return (
    <div className={styles.header}>
      <Link href="/">
        <IconButton
          size="large"
          sx={{
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)', // Change this to the desired hover effect
            },
          }}
        >
          <HomeIcon fontSize="inherit" style={{ color: 'white' }} />
        </IconButton>
      </Link>
    </div>
  );
};

export default Header;
