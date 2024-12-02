import React, { useState } from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import { signOutUser } from '../../actions/authActions';

const UserMenu = ({ user }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div style={{ background: 'white' }}>
      <IconButton
        aria-controls="minimalist-user-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <AccountCircle />
      </IconButton>
      <Menu
        id="minimalist-user-menu"
        anchorEl={anchorEl}
        keepMounted
        open={anchorEl}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Sign in as {user?.name}</MenuItem>

        <MenuItem onClick={handleClose}>
          <button onClick={async () => signOutUser()}>Log Out</button>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default UserMenu;
