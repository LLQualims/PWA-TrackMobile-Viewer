import React, {useState} from 'react';
import { useParams } from 'react-router-dom';
import DATFIC from '../../components/FIC/APP/General/OngletGeneral';
import HistoriqueList from '../../components/FIC/APP/Historique/OngletHistorique';
import {Tab, Box,  useMediaQuery, useTheme } from '@mui/material';
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import './APPAPFIC.css';
import SwipeableEdgeDrawer from '../../components/Drawer/OngletAutre';


export default function APPAPFIC(){
  const theme = useTheme();
  const { numeroAppareil } = useParams();
  const [value, setValue] = useState(0);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const allTabs = ['Général', 'Historique', 'Caractéristiques', 'Détails', 'Chaînage', 'Classeurs'];
  const mobileTabs = ['Général', 'Historique', 'Autres'];
  const tabsToShow = isMobile ? mobileTabs : allTabs;

  const AfficheTab = () => {
    if (isMobile && value === 2) {
      return <SwipeableEdgeDrawer />;
    }

    switch (value) {
      case 0:
        return <DATFIC numero={numeroAppareil} />;
      case 1:
        return <HistoriqueList />;
      case 2:
        return isMobile ? <SwipeableEdgeDrawer ouvre={true}/> : <DATFIC numero={numeroAppareil} />;
      case 3:
        return <SwipeableEdgeDrawer />;
      case 4:
        return ;
      case 5:
        return ;
      default:
        return null;
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
    <img src={require("../../assets/Images/APP_Titre-128-1.png")} className="titre" alt="titre" />
    <Box sx={{ color:'EQM.main', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: "25px"}}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons
         textColor="black"
        indicatorColor="primary"
        TabIndicatorProps={{
          style: {
            height: '3px',
          },
        }}
        sx={{
          [`& .${tabsClasses.scrollButtons}`]: {
            '&.Mui-disabled': { opacity: 0.3 },
          },
          '.MuiTab-root': {
            transition: 'none',
            '&:hover': {
              transition: 'none',
            },
            fontSize: '1.2rem', 
            marginLeft: '10px',
            marginRight: '10px'
          },
        }}
      >
        {tabsToShow.map((label, index) => (
            <Tab
              key={index}
              label={label}
              sx={{
                fontWeight: value === index ? 'bold' : 'normal', color: 'black',textTransform: 'none'
              }}
            />
          ))}
      </Tabs>
      </Box>

      {AfficheTab()} 
    </>
  )    
  
}