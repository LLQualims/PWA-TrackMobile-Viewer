import React, { useEffect, useState, useRef } from 'react';
import '../../MenuOnglets.css';

import APPAPFIC_OngletGeneral from '../../../FIC/APP/General/OngletGeneral'
import APPAPFIC_OngletHistorique from '../../../FIC/APP/Historique/OngletHistorique';
import APPAPFIC_OngletCaracteristiques from '../../../FIC/APP/Caracteristiques/OngletCaracteristiques'
import Header from '../../../Header/Header';

import SwipeableViews from 'react-swipeable-views';

import { Tab, Box } from '@mui/material';
import Tabs, { tabsClasses } from '@mui/material/Tabs';


const MenuOnglets = (props) => {

  const contentRef = useRef(null);
  const [value, setValue] = useState(() =>{
    const savedIndex = localStorage.getItem('activeTabAPPAPFIC');
    return savedIndex !== null ? parseInt(savedIndex, 10) : 0;
  });

    const handleChange = (event, newValue) => {
      setValue(newValue);
      localStorage.setItem('activeTabAPPAPFIC', newValue);
    };

    const handleSwipeChange = (index) => {
      setValue(index);
      localStorage.setItem('activeTabAPPAPFIC', index)
    };

  useEffect(() =>{
    if (contentRef.current) {
      contentRef.current.parentElement.style.height= `${contentRef.current.scrollHeight}px`;
    }
  }, [value]);

    return (
      <div>
        <div className='header-onglet'>
        <Header nomimage={"APP_Titre-128-1.png"} urlretour={"/scan"} />
          <Box className="menu-onglets" >
            <Tabs value={value} onChange={handleChange} variant="scrollable"
              scrollButtons color="inherit" indicatorColor="primary" 
              TabIndicatorProps={{style: { height: '3px'}}}
              sx={{[`& .${tabsClasses.scrollButtons}`]: {display: 'flex',justifyContent:'center',opacity:1,'&.Mui-disabled': { opacity: 0.3 }},
                '.MuiTab-root': {transition: 'none','&:hover': {transition: 'none'},fontSize: '1.2rem',
                  marginLeft: '5px',marginRight: '5px', textTransform: 'none'}, '.Mui-selected': {
                  fontWeight: 'bold', color:'black'} }} >

              <Tab label="Général" />
              <Tab label="Historique" />
              <Tab label="Caractéristiques" />
            </Tabs>
          </Box>
        </div>
        <SwipeableViews index={value} onChangeIndex={handleSwipeChange} enableMouseEvents>
        <div className='contenu-onglet'>
          <APPAPFIC_OngletGeneral id={props.idappAppareil} />
        </div>
        <div className='contenu-onglet'>
          <APPAPFIC_OngletHistorique id={props.idappAppareil} />
        </div>
        <div className='contenu-onglet'>
          <APPAPFIC_OngletCaracteristiques id={props.idappAppareil} />
        </div>
      </SwipeableViews>
      </div>
    )
};

export default MenuOnglets;