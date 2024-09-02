import React, { useState, useEffect, useRef } from 'react';
import './BarcodeReader.css';

const BarcodeReader = ({ onScan }) => {
  const [isScanning, setIsScanning] = useState(false);

  const videoRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {
    const startCamera = async () => {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        try {
          streamRef.current = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: 'environment' }
          });
          if (videoRef.current) {
            videoRef.current.srcObject = streamRef.current;
            await new Promise((resolve) => {
              videoRef.current.onloadedmetadata = resolve;
            });
            videoRef.current.play();
          }
        } catch (error) {
          console.error('Error accessing camera:', error);
        }
      }
    };

    const stopCamera = () => {
      if (streamRef.current) {
        const tracks = streamRef.current.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };

    if (isScanning) {
      startCamera();
    } else {
      stopCamera();
    }

    return () => stopCamera();
  }, [isScanning]);

  useEffect(() => {
    const barcodeDetector = new window.BarcodeDetector({ formats: ['qr_code', 'code_128'] });

    const detectBarcode = async () => {
      if (barcodeDetector && videoRef.current) {
        try {
          const result = await barcodeDetector.detect(videoRef.current);
          if (result.length > 0) {
            const { rawValue } = result[0];
            onScan(rawValue);
            setIsScanning(false);
          }
        } catch (error) {
          console.error('Barcode detection error:', error);
        }
      }
    };

    let intervalId;
    if (isScanning) {
      intervalId = setInterval(detectBarcode, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isScanning, onScan]);

  return (
    <div>
      {!isScanning ? (
        <div className="button-qrcode">
          <img src={require("../../assets/QRCode_Inoky.com.png")} alt='Inoky.com' onClick={() => setIsScanning(true)}/> 
          <p>Appuyer sur le QR Code pour lancer la caméra</p>
        </div>
      ) : ( 
        <div className='camera-serveur'>
          <video ref={videoRef} />
        </div>
      )}
    </div>
  );
};

export default BarcodeReader;
