import React, { useEffect, useState } from 'react';
import axios from 'axios';

const HistoriqueList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const sortedData = [...data].sort((a, b) => {
    // Comparer les numéros d'appareil de manière alphabétique
    return a.numeroAppareil.localeCompare(b.numeroAppareil);
  });


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://192.168.39.68:4500/8.1b/app/appareil/10/historique', {
          headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJJZCI6ImI2NGQ5N2RkLTE4YTAtNDJkMi1hZTNkLWViM2Q5ZDRlYTQ5MCIsInN1YklkIjoiNzYiLCJzdWIiOiJLUCIsImp0aSI6IjFkZGEyODRmLTZjZTQtNGRlMC04NDEzLTk1NGI2YWI2YWM0MCIsIlByb2ZpbEVRTSI6IjYiLCJQcm9maWxMQUIiOiIxMCIsIm5iZiI6MTcxOTQ5ODE1OSwiZXhwIjoyMDE5NTAxNzU5LCJpYXQiOjE3MTk0OTgxNTksImlzcyI6IklOT0tZIiwiYXVkIjoiUVVBTElNUyJ9.TaF3QoT2AooxmPD6l_vXWFCnKDguU0pGiaGymo4_6mg'
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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className='tabAPP'>
      <ul className='list'>
        {sortedData.map((item) => (
           <button key={item.idappOperation}  className='list-item-button' type="button">
           <img src={require(`../../../../assets/Images/APP_MiseAuRebut-128-1.png`)} alt={`Image of ${item.idappNatureOperation}`} className="item-image" />
           <div className='contenu'>
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