import React from 'react';
import { useParams } from 'react-router-dom';
import DATFIC from '../../components/FIC/APP/General/OngletGeneral';
import HistoriqueList from '../../components/FIC/APP/Historique/OngletHistorique';
import {Tab, Box} from '@mui/material';
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import './APPAPFIC.css';

export default function APPAPFIC(){
  const { numeroAppareil } = useParams();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
    <img src={require("../../assets/Images/APP_Titre-128-1.png")} className="titre" alt="titre" />
    <h2>Informations sur l'appareil {numeroAppareil}</h2>

      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons
        aria-label="visible arrows tabs example"
        sx={{
          [`& .${tabsClasses.scrollButtons}`]: {
            '&.Mui-disabled': { opacity: 0.3 },
             color: 'red'
          },
        }}
      >
        <Tab label="Général" />
        <Tab label="Historique" />
        <Tab label="Item Three" />
        <Tab label="Item Four" />
        <Tab label="Item Five" />
        <Tab label="Item Six" />
        <Tab label="Item Seven" />
      </Tabs>

      {value === 0 && <DATFIC numero={numeroAppareil}/>}
      {value === 1 && <HistoriqueList/>}
      
    </>
  )    
  
}