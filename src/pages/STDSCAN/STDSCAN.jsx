import React, { useState, useEffect } from 'react';
import BarcodeReader from '../../components/BarcodeReader/BarcodeReader.jsx';
import { TextField, Button, Box, Toolbar, Typography,Grid } from '@mui/material';
import TemporaryDrawer from '../../components/Drawer/Drawer.jsx';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './STDSCAN.css';


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

const ScanPage = () => {

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
    VerifNumConditionnement();
  };

  // Recherche selon Numéro Appareil
  const VerifNumAppareil = async () => {
    const response = await axios.get(`${localStorage.getItem("URLServeur")}/app/appareil/numero`, {
      headers: {
        NumeroAppareil: `${searchTerm}`,
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJJZCI6ImI2NGQ5N2RkLTE4YTAtNDJkMi1hZTNkLWViM2Q5ZDRlYTQ5MCIsInN1YklkIjoiNzYiLCJzdWIiOiJLUCIsImp0aSI6IjFkZGEyODRmLTZjZTQtNGRlMC04NDEzLTk1NGI2YWI2YWM0MCIsIlByb2ZpbEVRTSI6IjYiLCJQcm9maWxMQUIiOiIxMCIsIm5iZiI6MTcxOTQ5ODE1OSwiZXhwIjoyMDE5NTAxNzU5LCJpYXQiOjE3MTk0OTgxNTksImlzcyI6IklOT0tZIiwiYXVkIjoiUVVBTElNUyJ9.TaF3QoT2AooxmPD6l_vXWFCnKDguU0pGiaGymo4_6mg'
      }
    });
    if (response.data.contenu.length === 1) {
      navigate(`/appareils/${response.data.contenu[0].numeroAppareil}`,{ state: { idappAppareil: response.data.contenu[0].idappAppareil } })
    } else {
      setinvalidTerm(true);
    }
  };

  // Recherche selon Numéro Conditionnement
  const VerifNumConditionnement = async () => {
    const response = await axios.get(`${localStorage.getItem("URLServeur")}/lar/conditionnement/numero`, {
      headers: {
        NumeroConditionnement: `${searchTerm}`,
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJJZCI6ImI2NGQ5N2RkLTE4YTAtNDJkMi1hZTNkLWViM2Q5ZDRlYTQ5MCIsInN1YklkIjoiNzYiLCJzdWIiOiJLUCIsImp0aSI6IjFkZGEyODRmLTZjZTQtNGRlMC04NDEzLTk1NGI2YWI2YWM0MCIsIlByb2ZpbEVRTSI6IjYiLCJQcm9maWxMQUIiOiIxMCIsIm5iZiI6MTcxOTQ5ODE1OSwiZXhwIjoyMDE5NTAxNzU5LCJpYXQiOjE3MTk0OTgxNTksImlzcyI6IklOT0tZIiwiYXVkIjoiUVVBTElNUyJ9.TaF3QoT2AooxmPD6l_vXWFCnKDguU0pGiaGymo4_6mg'
      }
    });
    if (response.data.contenu.length === 1) {
      navigate(`/conditionnements/${response.data.contenu[0].numConditionnement}`)
    } else {
      setinvalidTerm(true);
    }
  };

  return (
    <div className='STDSCAN'>
      <Toolbar className='toolbar'>
        <Grid container alignItems="center" >
          <Grid item xs={2} display="flex" justifyContent="flex-start" sx={{ alignContent: 'center' }}>
            <TemporaryDrawer />
          </Grid>
          <Grid item xs={8} display="flex" justifyContent="center">
            <Typography>
              <img src={require('../../assets/Images/STD_Titre-128-1.png')} className="titre-scan" alt="titre" />
            </Typography>
          </Grid>
        </Grid>
      </Toolbar>

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
              <TextField label="Rechercher" variant="outlined" value={searchTerm} onChange={handleSearchChange} className='search-bar' />
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

export default ScanPage;
