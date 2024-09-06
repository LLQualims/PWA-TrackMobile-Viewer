import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TextFieldReadonly from '../../../ChampsUISimples/TextFieldReadonly';
import CircularProgress from '../../../ChampsUISimples/CircularProgress';
import Erreur from '../../../ChampsUISimples/Erreur';
import './OngletGeneral.css'

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

  if (loading) {
    return <div><CircularProgress/></div>;
  }

    if (error) {
        return <Erreur libelleErreur={error.message} />;
  }

  return (
    <div>
     
        {data.map((item) => (
            <div>

                <div id="statut">
                    <img id="img_statut_fond" src={require(`../../../../assets/Images/STD_Statut${item.idappStatut}-128-1.png`)} alt="Statut" />
                    <img id="img_statut_etat" className="superpose" src={require(`../../../../assets/Images/APP_Etat7-72-1.png`)} />
                    <p id="txt_statut_texte" className="superpose">{item.appStatut ? item.appStatut.designationStatut : ""}</p>
                </div>

                <div>
                    <TextFieldReadonly libelle="Famille" valeur={item.appFamille ? item.appFamille.designationFamille : ""} />
                    <TextFieldReadonly libelle="Numéro Appareil" valeur={item.numeroAppareil} />
                    <TextFieldReadonly libelle="Désignation Appareil" valeur={item.designationAppareil} />
                    <TextFieldReadonly libelle="Responsable" valeur={item.responsable ? item.responsable.prenomPersonnel + " " + item.responsable.nomPersonnel : ""} />
                    <TextFieldReadonly libelle="Localisation" valeur={item.envSalle ? item.envSalle.numeroSalle + " " + item.envSalle.designationSalle : ""} />
                    <TextFieldReadonly libelle="Prochaine Opération" valeur={item.dateFutureOperation ? new Date(item.dateFutureOperation).toLocaleDateString() : 'N/A'} />
                    <TextFieldReadonly libelle="Type" valeur={item.appType ? item.appType.designationType : ""} />
                    <TextFieldReadonly libelle="Date Acquisition" valeur={item.dateAcquisition ? new Date(item.dateAcquisition).toLocaleDateString() : 'N/A'} />
                    <TextFieldReadonly libelle="Date Mise En Service" valeur={item.dateMiseEnService ? new Date(item.dateMiseEnService).toLocaleDateString() : 'N/A'} />
                    <TextFieldReadonly libelle="Marque Appareil" valeur={item.marqueAppareil} />
                    <TextFieldReadonly libelle="Numéro Série" valeur={item.numeroSerie} />
                    <TextFieldReadonly libelle="Info Étiquette" valeur={item.infoEtiquette} />
                    <TextFieldReadonly libelle="Remarque" valeur={item.remarqueHTML} />
                </div>
            </div>
        ))}
    </div>
);
};

export default DATFIC;
