import React, { useEffect, useState, useRef } from 'react';
import '../../MenuOnglets.css';

import LARCOFIC_OngletGeneral from '../../../FIC/LAR/General/OngletGeneral'
import LARCOFIC_OngletHistorique from '../../../FIC/LAR/Historique/OngletHistorique';
import LARCOFIC_OngletFDS from '../../../FIC/LAR/FDS/OngletFDS';
import LARCOFIC_OngletCaracteristiques from '../../../FIC/LAR/Caracteristiques/OngletCaracteristiques'
import Header from '../../../Header/Header';

import SwipeableViews from 'react-swipeable-views';

import { Tab, Box } from '@mui/material';
import Tabs, { tabsClasses } from '@mui/material/Tabs';


const MenuOnglets = (props) => {

    const contentRef = useRef(null);
    const [value, setValue] = useState(() => {
        const savedIndex = localStorage.getItem('activeTabLARCOFIC');
        return savedIndex !== null ? parseInt(savedIndex, 10) : 0;
    });

    const handleChange = (event, newValue) => {
        setValue(newValue);
        localStorage.setItem('activeTabLARCOFIC', newValue);
    };

    const handleSwipeChange = (index) => {
        setValue(index);
        localStorage.setItem('activeTabLARCOFIC', index)
    };

    useEffect(() => {
        if (contentRef.current) {
            contentRef.current.parentElement.style.height = `${contentRef.current.scrollHeight}px`;
        }
    }, [value]);

    return (
        <div>
            <div className='header-onglet'>
                <Header nomimage={"LAR_Titre-128-1.png"} urlretour={"/scan"} />
                <Box className="menu-onglets" >
                    <Tabs value={value} onChange={handleChange} variant="scrollable"
                        scrollButtons textColor="black" indicatorColor="primary"
                        TabIndicatorProps={{ style: { height: '3px' } }}
                        sx={{
                            [`& .${tabsClasses.scrollButtons}`]: { display: 'flex', opacity: 1, '&.Mui-disabled': { opacity: 0.3 } },
                            '.MuiTab-root': {
                                transition: 'none', '&:hover': { transition: 'none' }, fontSize: '1.2rem',
                                marginLeft: '10px', marginRight: '10px', textTransform: 'none'
                            }, '.Mui-selected': {
                                fontWeight: 'bold'
                            }
                        }} >

                        <Tab label="Général" />
                        <Tab label="Historique" />
                        <Tab label="FDS" />
                        <Tab label="Caractéristiques" />
                    </Tabs>
                </Box>
            </div>
            <SwipeableViews index={value} onChangeIndex={handleSwipeChange} enableMouseEvents>
                <div className='contenu-onglet'>
                    <LARCOFIC_OngletGeneral id={props.idlarConditionnement} />
                </div>
                <div className='contenu-onglet'>
                    <LARCOFIC_OngletHistorique id={props.idlarConditionnement} />
                </div>
                <div className='contenu-onglet'>
                    <LARCOFIC_OngletFDS id={props.idlarConditionnement} />
                </div>
                <div className='contenu-onglet'>
                    <LARCOFIC_OngletCaracteristiques id={props.idlarConditionnement} />
                </div>
            </SwipeableViews>
        </div>
    )
};

export default MenuOnglets;