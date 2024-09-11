import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './OngletHistorique.css';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import CircularProgress from '../../../ChampsUISimples/CircularProgress';
import BlocData from '../../../ChampsUISimples/BlocData';
import Erreur from '../../../ChampsUISimples/Erreur';
import {getImageOperation} from '../../../../outils/Image.js';

const APPAPFIC_OngletHistorique = (props) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [nbresult, setnbResult] = useState(0);
  const [archives, setArchives] = useState(false);
 

  useEffect(() => {

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(`${localStorage.getItem('URLServeur')}/app/appareil/${props.id}/historique`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('Token')}`,
            SousEntites: '1',
            Archives: archives ? '1' : '0' 
          }
        });

        if (Array.isArray(response.data.contenu)) {
          setData(response.data.contenu);
          setnbResult(response.data.contenu.length);
        } else {
          throw new Error('Les données récupérées ne sont pas un tableau');
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  },[archives, props.id]);

    if (error) {
        return <Erreur libelleErreur={error.message } />;
  }

    const getCouleurWindev = (color) => {
        const bleu = Math.floor(color / 65536);
        const vert = Math.floor((color - (bleu * 65536)) / 256);
        const rouge = color - (bleu * 65536) - (vert * 256);
      
        // Retourne la couleur au format rgb
        return `rgb(${rouge}, ${vert}, ${bleu})`;
    };

  return (
    <div className='tab'>
      <p className='titreonglet'>LISTE DES OPÉRATIONS</p>
      <div className='headeroperations'>
        <p className='nbresultat'>{nbresult} opérations</p>
          <FormControlLabel className='selectarchives' value="start" control={<Switch  checked={archives} onChange={(event) => setArchives(event.target.checked)}/>} label="Afficher les archives" labelPlacement="start"/>
      </div>
      
          {loading ? (
              <CircularProgress />
          ) : (
              data.map((item) => (
                  <BlocData
                    image={getImageOperation(item.idappNatureOperation, item.appNatureOperation.nomImage)}
                    altImage={`Image of ${item.idappNatureOperation}`}
                    ligne1={item.appNatureOperation.designationNatureOperation}
                    ligne2={`${new Date(item.dateOperation).toLocaleDateString()} ${item.heureOperation.slice(0, 2)}:${item.heureOperation.slice(2, 4)}:${item.heureOperation.slice(4, 6)}`}
                    couleurStatut={getCouleurWindev(item.appStatut?.couleur)}
                    urlDestination={`/appareils/${props.id}/operations/${item.idappOperation}`}
                  />
        ))
      )}
    </div>
  );
};

export default APPAPFIC_OngletHistorique;