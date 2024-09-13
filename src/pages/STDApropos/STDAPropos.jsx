import React from 'react';
import { useNavigate } from 'react-router-dom';
import InfosBdd from '../../components/STD/InfosBdd';
import InfosApi from '../../components/STD/InfosApi';
import './STDAPropos.css'

export default function STDApropos() {

    const navigate = useNavigate();
    
    return (
        <div className='STDAPropos'>
            <div>
                <img src={require("../../assets/QRCode_Inoky.com.png")} className="img_qrcode" alt="Changer d'environnement" onClick={() => navigate('/connexionserveur')} />
            </div>
            <img src={require("../../assets/TM_Titre.png")} className="titrefen" alt="titre" />

            <div>
                <InfosBdd></InfosBdd>
                <InfosApi></InfosApi>
                
                <div className="image-container">
                    <img src={require("../../assets/Icone_Inoky_100x42.png")} alt="Inoky"/>
                </div>
            </div>
        </div>
    );

};
