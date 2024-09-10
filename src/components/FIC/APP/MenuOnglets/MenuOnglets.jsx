import React, { useState } from 'react';
import '../../MenuOnglets.css';

import APPAPFIC_OngletGeneral from '../../../FIC/APP/General/OngletGeneral'
import APPAPFIC_OngletHistorique from '../../../FIC/APP/Historique/OngletHistorique';
import APPAPFIC_OngletCaracteristiques from '../../../FIC/APP/Caracteristiques/OngletCaracteristiques'

import { Tab, Box } from '@mui/material';
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import Header from '../../../Header/Header';

const MenuOnglets = (props) => {

  const [value, setValue] = useState(0);


    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    return (
      <div>
        <div className='header-onglet'>
        <Header nomimage={"APP_Titre-128-1.png"} urlretour={"/scan"} />
          <Box className="menu-onglets" >
            <Tabs value={value} onChange={handleChange} variant="scrollable"
              scrollButtons textColor="black" indicatorColor="primary" 
              TabIndicatorProps={{style: { height: '3px'}}}
              sx={{[`& .${tabsClasses.scrollButtons}`]: {display: 'flex',opacity:1,'&.Mui-disabled': { opacity: 0.3 }},
                '.MuiTab-root': {transition: 'none','&:hover': {transition: 'none'},fontSize: '1.2rem',
                  marginLeft: '10px',marginRight: '10px', textTransform: 'none'}, '.Mui-selected': {
                  fontWeight: 'bold'} }} >

              <Tab label="Général" />
              <Tab label="Historique" />
              <Tab label="Caractéristiques" />
              <Tab label="Détails" />
            </Tabs>
          </Box>
        </div>
        <div className='contenu-onglet'>
          {value === 0 && <APPAPFIC_OngletGeneral id={props.idappAppareil} />}
          {value === 1 && <APPAPFIC_OngletHistorique id={props.idappAppareil} />}
          {value === 2 && <APPAPFIC_OngletCaracteristiques id={props.idappAppareil} />}
          {value === 3 && <div>Détails</div>}
        </div>
      </div>
    )
};

export default MenuOnglets;