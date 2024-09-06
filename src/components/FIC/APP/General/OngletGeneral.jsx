import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ChampDetailCadre from './ChampDetailCadre';
import './OngletGeneral.css';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

const DATFIC = (props) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
          const response = await axios.get(`${localStorage.getItem("URLServeur")}/app/appareil/numero`,  {
          headers: {
                  Authorization: `Bearer ${localStorage.getItem('Token')}`,
                  NumeroAppareil: `${props.numero}`,
                  SousEntites: '1'
          }
        });

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
  },[]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className='tab'>
      <p className='titreonglet'>INFORMATIONS SUR L'APPAREIL</p>

      {loading ? (
        <Box sx={{ marginTop: "10%" }}>
          <CircularProgress />
        </Box>
      ) : (
        data.map((item) => (
            <div className='infosgeneral'>
              
                <div id="statut">
                    <img id="img_statut_fond" src={require(`../../../../assets/Images/STD_Statut${item.idappStatut}-128-1.png`)} alt="Statut" />
                    <img id="img_statut_etat" className="superpose" src={require(`../../../../assets/Images/APP_Etat7-72-1.png`)} />
                    <p id="txt_statut_texte" className="superpose">{item.appStatut ? item.appStatut.designationStatut : ""}</p>
                </div>
                    <ChampDetailCadre libelle="Famille" valeur={item.appFamille ? item.appFamille.designationFamille : ""} />
                    <ChampDetailCadre libelle="Numéro Appareil" valeur={item.numeroAppareil} />
                    <ChampDetailCadre libelle="Désignation Appareil" valeur={item.designationAppareil} />
                    <ChampDetailCadre libelle="Responsable" valeur={item.responsable ? item.responsable.prenomPersonnel + " " + item.responsable.nomPersonnel : ""} />
                    <ChampDetailCadre libelle="Localisation" valeur={item.envSalle ? item.envSalle.numeroSalle + " " + item.envSalle.designationSalle : ""} />
                    <ChampDetailCadre libelle="Prochaine Opération" valeur={item.dateFutureOperation ? new Date(item.dateFutureOperation).toLocaleDateString() : 'N/A'} />
                    <ChampDetailCadre libelle="Type" valeur={item.appType ? item.appType.designationType : ""} />
                    <ChampDetailCadre libelle="Date Acquisition" valeur={item.dateAcquisition ? new Date(item.dateAcquisition).toLocaleDateString() : 'N/A'} />
                    <ChampDetailCadre libelle="Date Mise En Service" valeur={item.dateMiseEnService ? new Date(item.dateMiseEnService).toLocaleDateString() : 'N/A'} />
                    <ChampDetailCadre libelle="Marque Appareil" valeur={item.marqueAppareil} />
                    <ChampDetailCadre libelle="Numéro Série" valeur={item.numeroSerie} />
                    <ChampDetailCadre libelle="Info Étiquette" valeur={item.infoEtiquette} />
                    <ChampDetailCadre libelle="Remarque" valeur={item.remarqueHTML} />
            </div>
          ))
        )}
    </div>
      )
    };
export default DATFIC;
