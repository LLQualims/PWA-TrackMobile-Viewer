import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './LAROPFIC.css';

import Header from '../../components/Header/Header';
import TextFieldReadonly from '../../components/ChampsUISimples/TextFieldReadonly';
import Erreur from '../../components/ChampsUISimples/Erreur';
import { CircularProgress } from '@mui/material';
import { getImageOperation } from '../../outils/Image';

export default function LAROPFIC() {

    const [error, setError] = useState(null);
    const [dataOperation, setDataOperation] = useState(null);
    const [dataArticle, setDataArticle] = useState(null);
    const [loadingOperation, setLoadingOperation] = useState(true);
    const { idlarConditionnement, idlarOperationCO } = useParams();

    const rechercheHistorique = async () => {
        try {
            const response = await  axios.get(`${localStorage.getItem("URLServeur")}/lar/operationco/${idlarOperationCO}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('Token')}`,
                    SousEntites: '1'
                }
            });

            if (response.data.contenu && typeof response.data.contenu === 'object') {
                setDataOperation(response.data.contenu);
                { await rechercheArticle(response.data.contenu.larConditionnement.idlarArticle); }
            } else {
                throw new Error('Les données récupérées ne sont pas un objet');
            }
        } catch (err) {
            setError(err);
        } finally {
            setLoadingOperation(false);
        }
    }

    const rechercheArticle = async (idlarArticle) => {
        try {
            const response = await axios.get(`${localStorage.getItem("URLServeur")}/lar/article/${idlarArticle}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('Token')}`
                }
            });

            if (response.data.contenu && typeof response.data.contenu === 'object') {
                setDataArticle(response.data.contenu);
            } else {
                throw new Error('Les données récupérées ne sont pas un objet');
            }
        } catch (err) {
            setError(err);
        }
    }

    useEffect(() => {
        rechercheHistorique();
    }, [], dataArticle);

    if (error) {
        return <Erreur libelleErreur={error.message} />;
    }

    return (
        <>
            <Header nomimage={"LAR_Titre-128-1.png"} urlretour={`/conditionnements/${idlarConditionnement}`} />
            { (loadingOperation) ? (
                <CircularProgress />
            ) : (
                <div id='contenu'>
                    <div id="header-images">
                        <div id="image-operation">
                            <img id="image" src={getImageOperation(dataOperation.idlarNatureOperationCO, dataOperation.larNatureOperationCO.nomImage)} alt="Opération" />
                            <p>{dataOperation.larNatureOperationCO.designationNatureOperation}</p>
                        </div>

                    {dataOperation.idlarStatutCO !== 0 &&(
                        <div id="image-statut">
                            <img id="image" src={require(`../../assets/Images/APP_Statut${dataOperation.idlarStatutCO}-128-1.png`)} alt="Statut" />
                            <p>{dataOperation.larStatutCO.designationStatut}</p>
                        </div> 
                         )}                 
                    </div>

                    <div>
                        <TextFieldReadonly libelle="Appareil Concerné" valeur={`${dataOperation.larConditionnement.numConditionnement} - ${dataArticle.codeArticle} - ${dataArticle.designationArticle}`} />
                        <TextFieldReadonly libelle="Date" valeur={dataOperation.dateOperation ? new Date(dataOperation.dateOperation).toLocaleDateString() : 'N/A'} />
                        <TextFieldReadonly libelle="Heure" valeur={`${dataOperation.heureOperation.slice(0, 2)}:${dataOperation.heureOperation.slice(2, 4)}:${dataOperation.heureOperation.slice(4, 6)}`} />
                        <TextFieldReadonly libelle="Intervenant" valeur={dataOperation.nomIntervenant} />
                        <TextFieldReadonly libelle="Remarque" valeur={dataOperation.remarqueAChaudHTML} />
                        <div dangerouslySetInnerHTML={{ __html: dataOperation.remarqueAChaudHTML }} />
                    </div>
                </div>
            )}
        </>
    );

};