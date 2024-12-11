// External Libraries 
import { useState, useContext } from 'react';
import { useNavigate, } from 'react-router-dom';
// MUI Libraries
import { Avatar, IconButton, Menu, MenuItem } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
// Internal Libraries / Components
import { AuthContext } from '../../../context/auth.context';



function AvatarMenu() {

  const [anchorEl, setAnchorEl] = useState(null);

  const { user, logOutUser } = useContext(AuthContext);

  const navigate = useNavigate();


  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };


  const handleCloseMenu = () => {
    setAnchorEl(null);
  };


  const handleLogoutClick = () => {
    logOutUser();
    handleCloseMenu();
  };

  const handleProfileClick = () => {
    navigate('/api/profile');
    handleCloseMenu();
  };


  return (
    <div>
      {/* Avatar Circle with First Letter */}
      <IconButton onClick={handleAvatarClick} sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar sx={{ bgcolor: 'white', color: 'primary.main', fontSize: 20 }}>
          {user?.name ? user.name[0].toUpperCase() : '🤷‍♂️'}
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
}; export default AvatarMenu;