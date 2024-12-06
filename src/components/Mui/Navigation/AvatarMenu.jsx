// External Libraries 
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import { Menu, MenuItem, IconButton, Avatar } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import PropTypes from 'prop-types';
// Internal Libraries / Components
import { AuthContext } from '../../../context/auth.context'; 

function AvatarMenu() {
  const [anchorEl, setAnchorEl] = useState(null); //open/close the menu
  const navigate = useNavigate();
  const { user, logOutUser } = useContext(AuthContext);

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = () => {
    navigate('/profile');
    handleCloseMenu();
  };

  const handleLogoutClick = () => {
    logOutUser();
    handleCloseMenu();
  };


  return (
    <div>
      {/* Avatar Circle with First Letter */}
      <IconButton onClick={handleAvatarClick} sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar sx={{ bgcolor: 'white', color: 'primary.main', fontSize: 20 }}>
          {user?.name[0].toUpperCase()}
        </Avatar>
      </IconButton>

      {/* Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {/* Profile Menu Item */}
        <MenuItem onClick={handleProfileClick}>
          <AccountCircleIcon sx={{ marginRight: 1 }} />
          Profile
        </MenuItem>

        {/* Logout Menu Item */}
        <MenuItem onClick={handleLogoutClick}>
          <LogoutIcon sx={{ marginRight: 1 }} />
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
}

// Optional: Type-checking with PropTypes
AvatarMenu.propTypes = {
  user: PropTypes.object.isRequired, // Assumes user has a 'name' property
  onLogout: PropTypes.func.isRequired,
  onNavigate: PropTypes.func.isRequired,
};

export default AvatarMenu;
