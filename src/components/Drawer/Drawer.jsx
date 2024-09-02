import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import './Drawer.css';


export default function SwipeableTemporaryDrawer() {
  const [state, setState] = React.useState({
    left: false,
  });

  const navigate = useNavigate();

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, left: open });
  };

  return (
    <div>
       <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
      <SwipeableDrawer anchor="left" open={state.left} onClose={toggleDrawer(false)} onOpen={toggleDrawer(true)}>
      <Box sx={{ width: 250, height:'100%', backgroundImage: `url(${require("../../assets/TM_FondComplet.png")})`,  backgroundSize: 'cover', backgroundPosition: 'center'}} 
      role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
         <img src={require("../../assets/TM_Titre.png")} alt="Logo Drawer" className="logo-drawer"/>
         <div className='menu-container'>
          <div className="image-container">
            <p>SCAN</p>
            <img src={require("../../assets/Images/STD_MenuScan-210-1.png")} alt="Menu Rechercher" className="top-image-drawer" onClick={() => navigate('/scan')}/>
          </div>
        </div>
    </Box>
      </SwipeableDrawer>
    </div>
  );
}
