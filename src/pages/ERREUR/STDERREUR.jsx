import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

export default function STDERREUR() {

    const navigate = useNavigate();

    return (
        <div className='STDAPropos'>
            <div className='header'>
                <button className='btn-retour' onClick={() => navigate('/')}>
                    <ArrowBackIosNewIcon/>
                </button>
            </div>
            
            <img src={require("../../assets/TM_Titre.png")} className="titrefen" alt="titre" />

            <div>
                <h1>OUPS !!</h1>
                <h1>La page que vous recherchez semble introuvable</h1>
                <div className="image-container">
                    <img src={require("../../assets/Icone_Inoky_100x42.png")} alt="Inoky"/>
                </div>
            </div>
        </div>
    );

};