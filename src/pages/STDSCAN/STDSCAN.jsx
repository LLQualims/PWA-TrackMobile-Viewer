import React, { useState, useEffect } from 'react';
import BarcodeReader from '../../components/BarcodeReader/BarcodeReader.jsx';
import { TextField, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './STDSCAN.css';
import Header from '../../components/Header/Header.jsx';


const isBarcodeDetectionSupported = async () => {
  if ('BarcodeDetector' in window) {
    const formats = await window.BarcodeDetector.getSupportedFormats();
    return formats.includes('qr_code', 'code_128');
  }
  return false;
};

const isIOS = () => {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
};

const STDSCAN = () => {

  const [supported, setSupported] = useState(false);
  const [ios, setIos] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [invalidTerm, setinvalidTerm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkSupport = async () => {
      const supported = await isBarcodeDetectionSupported();
      setSupported(supported);
      setIos(isIOS());
    };

    checkSupport();
  }, []);


  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    VerifNumAppareil();
    VerifIDAppareil();
    VerifNumConditionnement();
  };

  // Recherche selon Numéro Appareil
  const VerifNumAppareil = async () => {
    try {
      const response = await axios.get(`${localStorage.getItem("URLServeur")}/app/appareil/numero`, {
        headers: {
          NumeroAppareil: `${searchTerm}`,
          Authorization: `Bearer ${localStorage.getItem('Token')}`
        }
      });
      if (response.data.contenu.length === 1) {
        navigate(`/appareils/${response.data.contenu[0].idappAppareil}`)
      } else {
        setinvalidTerm(true);
      }
    } catch {
      setinvalidTerm(true)
    }
  };

  // Recherche selon ID Appareil
  const VerifIDAppareil = async () => {
    try {
      const response = await axios.get(`${localStorage.getItem("URLServeur")}/app/appareil/${searchTerm}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('Token')}`
        }
      });
      if (response.data.codeEtat === 200) {
        navigate(`/appareils/${response.data.contenu.idappAppareil}`)
      } else {
        setinvalidTerm(true);
      }
    } catch {
      setinvalidTerm(true);
    }
  };

  // Recherche selon Numéro Conditionnement
  const VerifNumConditionnement = async () => {
    try {
      const response = await axios.get(`${localStorage.getItem("URLServeur")}/lar/conditionnement/numero`, {
        headers: {
          NumeroConditionnement: `${searchTerm}`,
          Authorization: `Bearer ${localStorage.getItem('Token')}`
        }
      });
      if (response.data.contenu.length === 1) {
        navigate(`/conditionnements/${response.data.contenu[0].idlarConditionnement}`)
      } else {
        setinvalidTerm(true);
      }
    } catch {
      setinvalidTerm(true);
    }

  };

  return (
    <div className='STDSCAN'>

      <Header nomimage={"STD_Titre-128-1.png"} urlretour={"/"} />

      {supported ? (
        <BarcodeReader />
      ) : (

        <div>
          <p className="no-support" style={{ display: supported ? 'none' : 'block' }}>
            La fonctionnalité "Scan" n'est pas prise en charge sur votre appareil <br /><br /> Veuillez saisir le numéro de votre appareil ou de votre conditionnement.
          </p>
          {ios && (
            <p className="no-support-ios">
              À partir d'iOS 17, cette fonctionnalité peut être activée dans les paramètres &gt; Safari &gt; Avancé &gt; Drapeaux de fonctionnalité &gt; API de détection de forme
            </p>
          )}

          <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <Box display="flex" flexDirection="column" alignItems="center">
              <TextField autoFocus label="Rechercher" variant="outlined" value={searchTerm} onChange={handleSearchChange} className='search-bar' />
              <Button variant="contained" type="submit" style={{ marginTop: '20px', width: '150px', background: 'white', color: '#00759C', fontWeight: 'bold' }}> Rechercher </Button>
              {invalidTerm && (
                <p className="error-message" style={{ color: 'red', fontWeight: 'bold', marginTop: '10px' }}>
                  Numéro inconu. Veuillez réessayer.
                </p>)}
            </Box>
          </form>
        </div>
      )}
    </div>
  );
};

export default STDSCAN;
