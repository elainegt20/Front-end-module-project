import IconButton from '@mui/material/IconButton';

import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import { useMediaQuery } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Link from 'next/link';

import styles from './SideBar.module.css';

const Header = ({ toggleSidebar, isOpen }) => {
  const isSmallScreen = useMediaQuery('(max-width:768px)');
  return (
    <div className={styles.header}>
      <Link href="/">
        <IconButton
          size="large"
          sx={{
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            },
          }}
        >
          <HomeIcon fontSize="inherit" style={{ color: 'white' }} />
        </IconButton>
      </Link>

      {isSmallScreen && (
        <IconButton
          onClick={() => {
            toggleSidebar();
          }}
        >
          {isOpen ? (
            <CloseIcon fontSize="inherit" style={{ color: 'white' }} />
          ) : (
            <MenuIcon
              className={styles.menu}
              style={{
                color: 'white',
                backgroundColor: 'transparent',
                fontSize: '40px',
              }}
            />
          )}
        </IconButton>
      )}
    </div>
  );
};

export default Header;
