import React from 'react';

import Header from './Header';
import styles from './SideBar.module.css';

const SideBarContainer = ({ children }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    // Adjust sidebar state based on window size
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsOpen(true); // Show sidebar by default on larger screens
      } else {
        setIsOpen(false); // Hide sidebar by default on smaller screens
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Call once to set initial state

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div
      className={`${styles.sideBarContainer} ${!isOpen ? styles.close : styles.open}`}
    >
      <Header toggleSidebar={toggleSidebar} isOpen={isOpen} />
      {React.Children.map(children, (child) => {
        if (child.type === 'header') {
          return React.cloneElement(child, { toggleSidebar });
        }
        return child;
      })}
    </div>
  );
};

export default SideBarContainer;
