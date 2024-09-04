import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './OngletHistorique.css';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


const HistoriqueList = (props) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

 

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await axios.get(`${localStorage.getItem('URLServeur')}/app/appareil/${props.id}/historique`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('Token')}`
          }
        });
        // Vérifiez si la propriété 'contenu' est un tableau
        if (Array.isArray(response.data.contenu)) {
          setData(response.data.contenu);
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
  }, []);

  if (loading) {
    return <Box sx={{ marginTop: "10%" }}>
            <CircularProgress />
          </Box>
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className='tabAPP'>
      <ul className='list'>
        {data.map((item) => (
           <button key={item.idappOperation}  className='list-item-button' type="button">
           <img src={require(`../../../../assets/Images/APP_MiseAuRebut-128-1.png`)} alt={`Image of ${item.idappNatureOperation}`} className="item-image" />
           <div className='contenu'>
             <p>{item.idappOperation}</p>
             <p>{item.heureOperation}</p>
             <p>{item.dateOperation}</p>
             <p>{item.nomIntervenant}</p>
           </div>
         </button>
        ))}
      </ul>
    </div>
  );
};

export default HistoriqueList;