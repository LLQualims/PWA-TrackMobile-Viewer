import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TextFieldReadonly from '../../../ChampsUISimples/TextFieldReadonly';
import CircularProgress from '../../../ChampsUISimples/CircularProgress';
import Erreur from '../../../ChampsUISimples/Erreur';
import './OngletGeneral.css'

const APPAPFIC_OngletGeneral = (props) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
          const response = await axios.get(`${localStorage.getItem("URLServeur")}/app/appareil/${props.id}`,  {
          headers: {
                  Authorization: `Bearer ${localStorage.getItem('Token')}`,
                  SousEntites: '1'
          }
        });

          if (response.data.contenu && typeof response.data.contenu === 'object') {
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
        return <Erreur libelleErreur={error.message} />;
  }

  return (
    <div className='tab'>
      <p className='titreonglet'>INFORMATIONS SUR L'APPAREIL</p>
        
        {loading ? (
                <CircularProgress />
            ) : (
            <div className='infosgeneral'>
                <div id="statut">
                    <img id="img_statut_fond" src={require(`../../../../assets/Images/STD_Statut${data.idappStatut}-128-1.png`)} alt="Statut" />
                    <img id="img_statut_etat" className="superpose" src={require(`../../../../assets/Images/APP_Etat7-72-1.png`)} />
                    <p id="txt_statut_texte" className="superpose">{data.appStatut ? data.appStatut.designationStatut : ""}</p>
                </div>

                <div>
                    <TextFieldReadonly libelle="Famille" valeur={data.appFamille ? data.appFamille.designationFamille : ""} />
                    <TextFieldReadonly libelle="Numéro Appareil" valeur={data.numeroAppareil} />
                    <TextFieldReadonly libelle="Désignation Appareil" valeur={data.designationAppareil} />
                    <TextFieldReadonly libelle="Responsable" valeur={data.responsable ? data.responsable.prenomPersonnel + " " + data.responsable.nomPersonnel : ""} />
                    <TextFieldReadonly libelle="Localisation" valeur={data.envSalle ? data.envSalle.numeroSalle + " " + data.envSalle.designationSalle : ""} />
                    <TextFieldReadonly libelle="Prochaine Opération" valeur={data.dateFutureOperation ? new Date(data.dateFutureOperation).toLocaleDateString() : 'N/A'} />
                    <TextFieldReadonly libelle="Type" valeur={data.appType ? data.appType.designationType : ""} />
                    <TextFieldReadonly libelle="Date Acquisition" valeur={data.dateAcquisition ? new Date(data.dateAcquisition).toLocaleDateString() : 'N/A'} />
                    <TextFieldReadonly libelle="Date Mise En Service" valeur={data.dateMiseEnService ? new Date(data.dateMiseEnService).toLocaleDateString() : 'N/A'} />
                    <TextFieldReadonly libelle="Marque Appareil" valeur={data.marqueAppareil} />
                    <TextFieldReadonly libelle="Numéro Série" valeur={data.numeroSerie} />
                    <TextFieldReadonly libelle="Info Étiquette" valeur={data.infoEtiquette} />
                    <TextFieldReadonly libelle="Remarque" valeur={data.remarqueHTML} />
                </div>
            </div>
        )}
    </div>
  );
};

export default APPAPFIC_OngletGeneral;
