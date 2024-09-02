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

const FenConnexionServeur = () => {

  const [supported, setSupported] = useState(false);
  const [serverAddress, setServerAddress] = useState('');
  const [badUrl, setbadUrl] = useState(false);
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
    setresponseError(url)
    localStorage.removeItem("URLServeur");
    const isValid = await VerificationUrl(url);
    if (isValid) {
      localStorage.setItem("URLServeur", url);
      navigate('/');
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    localStorage.removeItem("URLServeur");
    const isValid = await VerificationUrl(serverAddress);
    if (isValid) {
      localStorage.setItem("URLServeur", serverAddress);
      navigate('/');
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
              <p> Entrez l'adresse du serveur</p>
              <TextField style={{ background: 'white', width: '70%' }} onChange={(e) => setServerAddress(e.target.value)} placeholder="https://trackmobile.com" variant="outlined" margin="normal" />
              <Button variant="contained" type="submit" style={{ marginTop: '20px', width: '150px', background: 'white', color: '#00759C', fontWeight: 'bold' }}> Connexion </Button>
              {badUrl && (
                <p className='error-badurl'>Connexion au serveur impossible {responseError}</p>
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

export default FenConnexionServeur;
