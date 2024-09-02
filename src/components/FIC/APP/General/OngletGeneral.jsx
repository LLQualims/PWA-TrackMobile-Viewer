import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DATFIC = (props) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://192.168.39.68:4500/8.1b/app/appareil/numero`, {
          headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJJZCI6ImI2NGQ5N2RkLTE4YTAtNDJkMi1hZTNkLWViM2Q5ZDRlYTQ5MCIsInN1YklkIjoiNzYiLCJzdWIiOiJLUCIsImp0aSI6IjFkZGEyODRmLTZjZTQtNGRlMC04NDEzLTk1NGI2YWI2YWM0MCIsIlByb2ZpbEVRTSI6IjYiLCJQcm9maWxMQUIiOiIxMCIsIm5iZiI6MTcxOTQ5ODE1OSwiZXhwIjoyMDE5NTAxNzU5LCJpYXQiOjE3MTk0OTgxNTksImlzcyI6IklOT0tZIiwiYXVkIjoiUVVBTElNUyJ9.TaF3QoT2AooxmPD6l_vXWFCnKDguU0pGiaGymo4_6mg',
            NumeroAppareil: `${props.numero}`
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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
     
    {data.map((item) => (
    <div>
      <img src={require(`../../../../assets/Images/STD_Statut${item.idappStatut}-128-1.png`)} className="img-statut" alt="Statut" />
      <p><strong>ID App Type Etalon:</strong> {item.idappTypeEtalon}</p>
      <p><strong>ID App Statut:</strong> {item.idappStatut}</p>
      <p><strong>ID App Famille:</strong> {item.idappFamille}</p>
      <p><strong>ID App Appareil:</strong> {item.idappAppareil}</p>
      <p><strong>Numéro Appareil:</strong> {item.numeroAppareil}</p>
      <p><strong>Désignation Appareil:</strong> {item.designationAppareil}</p>
      <p><strong>Numéro Série:</strong> {item.numeroSerie}</p>
      <p><strong>Prix:</strong> {item.prix}</p>
      <p><strong>Amortissement:</strong> {item.amortissement}</p>
      <p><strong>Type Amortissement:</strong> {item.typeAmortissement}</p>
      <p><strong>Date Future Operation:</strong> {item.dateFutureOperation ? new Date(item.dateFutureOperation).toLocaleDateString() : 'N/A'}</p>
      <p><strong>Remarque:</strong></p>
      <p><strong>ID Responsable:</strong> {item.idResponsable}</p>
      <p><strong>Période Garantie:</strong> {item.periodeGarantie ? new Date(item.periodeGarantie).toLocaleDateString() : 'N/A'}</p>
      <p><strong>Suivi Automatique:</strong> {item.suiviAutomatique}</p>
      <p><strong>Audit CRE:</strong> {item.auditCRE}</p>
      <p><strong>Audit DCRE:</strong> {item.auditDCRE ? new Date(item.auditDCRE).toLocaleDateString() : 'N/A'}</p>
      <p><strong>Audit MOD:</strong> {item.auditMOD}</p>
      <p><strong>Audit DMOD:</strong> {item.auditDMOD ? new Date(item.auditDMOD).toLocaleDateString() : 'N/A'}</p>
      <p><strong>Numéro Facture:</strong> {item.numeroFacture}</p>
      <p><strong>Date Acquisition:</strong> {item.dateAcquisition ? new Date(item.dateAcquisition).toLocaleDateString() : 'N/A'}</p>
      <p><strong>Marque Appareil:</strong> {item.marqueAppareil}</p>
      <p><strong>Modèle Appareil:</strong> {item.modeleAppareil}</p>
      <p><strong>Type Étiquette:</strong> {item.typeEtiquette}</p>
      <p><strong>ID Env Salle:</strong> {item.idenvSalle}</p>
      <p><strong>Date Dernière Opération:</strong> {item.dateDerniereOperation ? new Date(item.dateDerniereOperation).toLocaleDateString() : 'N/A'}</p>
      <p><strong>Enregistrement Archive:</strong> {item.enrARCHIVE}</p>
      <p><strong>ID Env Service:</strong> {item.idenvService}</p>
      <p><strong>ID App Domaine:</strong> {item.idappDomaine}</p>
      <p><strong>Type Appareil:</strong> {item.typeAppareil}</p>
      <p><strong>ID Indisponibilité:</strong> {item.idIndisponibilite}</p>
      <p><strong>Date Mise En Service:</strong> {item.dateMiseEnService ? new Date(item.dateMiseEnService).toLocaleDateString() : 'N/A'}</p>
      <p><strong>Enregistrement Appareil:</strong> {item.enregistrementAppareil}</p>
      <p><strong>Déclassement:</strong> {item.declassement ? new Date(item.declassement).toLocaleDateString() : 'N/A'}</p>
      <p><strong>Verrou Operation:</strong> {item.verrouOperation}</p>
      <p><strong>Numéro Externe Appareil:</strong> {item.numeroExterneAppareil}</p>
      <p><strong>Date Renouvellement:</strong> {item.dateRenouvellement ? new Date(item.dateRenouvellement).toLocaleDateString() : 'N/A'}</p>
      <p><strong>Budget Renouvellement:</strong> {item.budgetRenouvellement}</p>
      <p><strong>ID App Criticité:</strong> {item.idappCriticite}</p>
      <p><strong>Notification Mail:</strong> {item.notifMail}</p>
      <p><strong>Info Étiquette:</strong> {item.infoEtiquette}</p>
      <p><strong>Date Fin Garantie:</strong> {item.dateFinGarantie ? new Date(item.dateFinGarantie).toLocaleDateString() : 'N/A'}</p>
      <p><strong>Alerte Garantie:</strong> {item.alerteGarantie}</p>
      <p><strong>Propagation Statut Salle:</strong> {item.propagationStatutSalle}</p>
      <p><strong>Champ01:</strong> {item.champ01}</p>
      <p><strong>Champ02:</strong> {item.champ02}</p>
      <p><strong>Champ03:</strong> {item.champ03}</p>
      <p><strong>Champ04:</strong> {item.champ04}</p>
      <p><strong>Champ05:</strong> {item.champ05}</p>
      <p><strong>Destination Appareil:</strong> {item.destinationAppareil}</p>
      <p><strong>Numéro Salle:</strong> {item.numeroSalle}</p>
      <p><strong>Code Service:</strong> {item.codeService}</p>
      <p><strong>ID Client:</strong> {item.idClient}</p>
      <p><strong>Enregistrement Verrou:</strong> {item.enrVerrou}</p>
      <p><strong>Audit Verrou:</strong> {item.auditVERROU}</p>
      <p><strong>Audit D Verrou:</strong> {item.auditDVERROU ? new Date(item.auditDVERROU).toLocaleDateString() : 'N/A'}</p>
      <p><strong>ID App Source Énergie:</strong> {item.idappSourceEnergie}</p>
      <p><strong>ID App Source Prise:</strong> {item.idappSourcePrise}</p>
      <p><strong>Puissance Électrique:</strong> {item.puissanceElectrique}</p>
      <p><strong>Localisation Position:</strong> {item.localisationPosition}</p>
      <p><strong>ID App Type:</strong> {item.idappType}</p>
      <p><strong>Numéro Immo:</strong> {item.numeroImmo}</p>
      <p><strong>Numéro Commande:</strong> {item.numeroCommande}</p>
      <p><strong>Référence:</strong> {item.reference}</p>
      <p><strong>Firmware:</strong> {item.firmware}</p>
      <p><strong>Joker:</strong> {item.joker}</p>
    </div>
    ))}
  </div>
);
};

export default DATFIC;
