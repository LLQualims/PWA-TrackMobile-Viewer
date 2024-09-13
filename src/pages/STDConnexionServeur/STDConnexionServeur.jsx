import React, { useState, useEffect } from 'react';
import BarcodeReader from '../../components/BarcodeReader/BarcodeReader.jsx';
import { TextField, Button, Box } from '@mui/material';
import '../STDConnexionServeur/STDConnexionServeur.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const isBarcodeDetectionSupported = async () => {
  if ('BarcodeDetector' in window) {
    const formats = await window.BarcodeDetector.getSupportedFormats();
    return formats.includes('qr_code');
  }
  return false;
};

const STDConnexionServeur = () => {

  const [supported, setSupported] = useState(false);
  const [serverAddress, setServerAddress] = useState('');
  const [tokenEnter, setTokenEnter] = useState('');
  const [badUrl, setbadUrl] = useState(false);
  const [badToken, setbadToken] = useState(false);
  const [responseError, setresponseError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const checkSupport = async () => {
      const supported = await isBarcodeDetectionSupported();
      setSupported(supported);
    };

    checkSupport();
  }, []);

  const handleScan = async (result) => {
    const data = JSON.parse(result);
    const url = data['URL'];
    const token = data['JWTToken']
    
    setresponseError(url)
    
    localStorage.removeItem("URLServeur");
    localStorage.removeItem("Token");

    if (await VerificationUrl(url)) {
      localStorage.setItem("URLServeur", url);

      if (await VerificationTokenValide(token)){
        localStorage.setItem("Token", token);
        navigate('/');
      }else{
        setbadToken(true)
        setresponseError("Token non valide")        
      }
    } else {
      setbadUrl(true)
    }
  };

  const VerificationUrl = async (baseurl) => {
    const url = `${baseurl}/helloworld`;
    try {
      const response = await axios.get(url);
      return response.status === 200;
    } catch (error) {
      return false;
    }
  };

  const VerificationTokenValide = async (token) => {
    try {
      const response = await axios.get(`${localStorage.getItem("URLServeur")}/helloworld/ValiditeToken`,  {
      headers: {
              Authorization: `Bearer ${token}`
        }
      });
      return response.status === 200;
    } catch (err) {
      return false;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    localStorage.removeItem("URLServeur");
    localStorage.removeItem("JWTToken");
   
    if (await VerificationUrl(serverAddress)) {
      localStorage.setItem("URLServeur", serverAddress);

      if (await VerificationTokenValide(tokenEnter)){
        localStorage.setItem("Token", tokenEnter);
        navigate('/');
      }else{
        setbadToken(true);
        setresponseError("Token non valide")        
      }
    } else {
      setbadUrl(true)
    }
  };

  return (
    <div className='ConnexionPage'>
      <img src={require("../../assets/TM_Titre.png")} className="logo" alt="logo" />
      <p className='titre-bienvenue'> Bienvenue sur Track Mobile !</p>
      {supported ? (
        <div className='qrcode-container'>
          <h4> Scanner le QR Code de connexion</h4>
          <BarcodeReader onScan={handleScan} />
          {badUrl && (
            <p className='error-badurl'>Connexion au serveur impossible {responseError}</p> 
          )}
        </div>
      ) : (
        <div className='url-text-container'>
          <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <Box display="flex" flexDirection="column" alignItems="center">
              <p> Copiez l'adresse du serveur ainsi que le jeton d'identification</p>
              <TextField style={{ background: 'white', width: '70%'}} onChange={(e) => setServerAddress(e.target.value)} placeholder="https://trackmobile.com" variant="outlined" margin="normal" />
              <TextField style={{ background: 'white', width: '70%' }} onChange={(e) => setTokenEnter(e.target.value)} placeholder="eyJhbGciOiJIUzI1NiJ9.eyJJZCI6ImI2NGQ5N2RkLTE4YTAtNDJkMi1hZTNkLWViM2Q5ZDRlYTQ5MCIsInN1YklkIjoiNzYiLCJzdWIiOiJLUCIsImp0aSI6IjFkZGEyODRmLTZjZTQtNGRlMC04NDEzLTk1NGI2YWI2YWM0MCIsIlByb2ZpbEVRTSI6IjYiLCJQcm9maWxMQUIiOiIxMCIsIm5iZiI6MTcxOTQ5ODE1OSwiZXhwIjoyMDE5NTAxNzU5LCJpYXQiOjE3MTk0OTgxNTksImlzcyI6IklOT0tZIiwiYXVkIjoiUVVBTElNUyJ9.TaF3QoT2AooxmPD6l_vXWFCnKDguU0pGiaGymo4_6mg" variant="outlined" margin="normal" />
              <Button variant="contained" type="submit" style={{ marginTop: '20px', width: '150px', background: 'white', color: '#00759C', fontWeight: 'bold' }}> Connexion </Button>
              {badUrl && (
                <p className='error-badurl'>Connexion au serveur impossible {responseError}</p>
              )}
              {badToken && (
                <p className='error-badurl'>Token invalide {responseError}</p>
              )}
            </Box>
          </form>
        </div>
      )}
      <div className='inoky-container'>
        <p> Si vous ne disposez pas de licence Track Mobile, contactez Inoky</p>
        <img src={require("../../assets/Icone_Inoky_100x42.png")} className="inoky-logo" alt="logo-inoky" />
      </div>
    </div>
  );
};

export default STDConnexionServeur;
