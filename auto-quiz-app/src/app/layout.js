import React from 'react';
import TopNav from './components/Navbar/TopNav';

import './styles.css';

function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <TopNav />
        {children}
      </body>
    </html>
  );
}

export default RootLayout;
