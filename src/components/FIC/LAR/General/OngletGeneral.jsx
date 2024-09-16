import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TextFieldReadonly from '../../../ChampsUISimples/TextFieldReadonly';
import CircularProgress from '../../../ChampsUISimples/CircularProgress';
import Erreur from '../../../ChampsUISimples/Erreur';
import '../../../FIC/OngletGeneral.css';

const LARCOFIC_OngletGeneral = (props) => {
    const [data, setData] = useState([]);
    const [salle, setSalle] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const rechercheConditionnement = async () => {
        try {
            const response = await axios.get(`${localStorage.getItem("URLServeur")}/lar/conditionnement/${props.id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('Token')}`,
                    SousEntites: '1'
                }
            });

            if (response.data.contenu && typeof response.data.contenu === 'object') {
                setData(response.data.contenu);
                if (response.data.contenu.labRangement) { await rechercheSalle(response.data.contenu.labRangement.idenvSalle); }
            } else {
                throw new Error('Les données récupérées ne sont pas un objet');
            }
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }

    const rechercheSalle = async (idEnvSalle) => {
        try {
            const response = await axios.get(`${localStorage.getItem("URLServeur")}/env/salle/${idEnvSalle}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('Token')}`
                }
            });

            if (response.data.contenu && typeof response.data.contenu === 'object') {
                setSalle(`${response.data.contenu.numeroSalle} ${response.data.contenu.designationSalle}`);
            } else {
                throw new Error('Les données récupérées ne sont pas un objet');
            }
        } catch (err) {
            setError(err);
        }
    }

    useEffect(() => {
        rechercheConditionnement();
    }, [], salle);

    if (error) {
        return <Erreur libelleErreur={error.message} />;
    }

    return (
        <div className='tab'>
            <p className='titreonglet'>INFORMATIONS SUR LE CONDITIONNEMENT</p>

            {loading ? (
                <CircularProgress />
            ) : (
                <div id='infos'>
                    <div id="statut">
                        <img id="img_statut_fond" src={require(`../../../../assets/Images/STD_Statut${data.larStatutCO.statutConditionnement}-128-1.png`)} alt="Statut" />
                        <img id="img_statut_etat" className="superpose" src={require(`../../../../assets/Images/LARCO_etat${data.envConditionnement.typeConditionnement}${data.larEtatCO.idlarEtatCO}-72-1.png`)} />
                        <p id="txt_statut_texte" className="superpose">{data.larEtatCO ? data.larEtatCO.designationEtat : ""}</p>
                    </div>

                    <div>
                        <TextFieldReadonly libelle="ARTICLE" valeur={data.larArticle ? data.larArticle.designationArticle : ""} />
                        <TextFieldReadonly libelle="N° COND." valeur={data.numConditionnement} />
                        <TextFieldReadonly libelle="QTE INITIALE" valeur={data.envUniteStockage ? `${data.quantiteConditionnement / data.envUniteStockage.tauxConversion} ${data.envUniteStockage.designationUnite}` : ''} />
                        <TextFieldReadonly libelle="QTE RESTANTE" valeur={data.envUniteStockage ? `${data.quantiteRestante / data.envUniteStockage.tauxConversion} ${data.envUniteStockage.designationUnite}` : ''} />
                        <TextFieldReadonly libelle="REÇU LE" valeur={data.dateReception ? new Date(data.dateReception).toLocaleDateString() : 'N/A'} />
                        <TextFieldReadonly libelle="OUVERT LE" valeur={data.dateOuverture ? new Date(data.dateOuverture).toLocaleDateString() : 'N/A'} />
                        <TextFieldReadonly libelle="PÉRIMÉ LE" valeur={data.datePeremptionConditionnement ? new Date(data.datePeremptionConditionnement).toLocaleDateString() : 'N/A'} />
                        <TextFieldReadonly libelle="TYPE COND." valeur={data.envConditionnement ? data.envConditionnement.designationConditionnement : ''} />
                        <TextFieldReadonly libelle="N° CAS" valeur={data.larArticle ? data.larArticle.numCAS : 'N/A'} />
                        <TextFieldReadonly libelle="RANGEMENT" valeur={`${data.labRangement ? data.labRangement.codeRangement : ''}${data.labSousRangement ? ` - ${data.labSousRangement.codeSousRangement}` : ''}`} />
                        <TextFieldReadonly libelle="SALLE" valeur={salle} />
                        <TextFieldReadonly libelle="FOURNISSEUR" valeur={data.extTiers ? data.extTiers.designationTiers : ''} />
                        <TextFieldReadonly libelle="RÉFÉRENCE" valeur={data.reference} />
                        <TextFieldReadonly libelle="N° LOT" valeur={data.larLot ? data.larLot.numeroLot : ""} />
                        <TextFieldReadonly libelle="LOT PÉRIMÉ LE" valeur={(data.larLot && data.larLot.datePeremption) ? new Date(data.larLot.datePeremption).toLocaleDateString() : 'N/A'} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default LARCOFIC_OngletGeneral;