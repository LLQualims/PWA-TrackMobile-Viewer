import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './APPOPFIC.css';

import Header from '../../components/Header/Header';
import TextFieldReadonly from '../../components/ChampsUISimples/TextFieldReadonly';
import Erreur from '../../components/ChampsUISimples/Erreur';
import { CircularProgress } from '@mui/material';
import {getImageOperation} from '../../outils/Image';

export default function APPOPFIC() {

    const [error, setError] = useState(null);
    const [dataOperation, setDataOperation] = useState(null);
    const [dataStatut, setDataStatut] = useState(null);
    const [loadingOperation, setLoadingOperation] = useState(true);
    const [loadingStatut, setLoadingStatut] = useState(true);
    const { idappAppareil, idappOperation } = useParams();
    useEffect(() => {
        const fetchDataOperation = async () => {
            try {
                const responseOperation = await axios.get(`${localStorage.getItem("URLServeur")}/app/operation/${idappOperation}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('Token')}`,
                        SousEntites: '1'
                    }
                });

                if (responseOperation.data.contenu && typeof responseOperation.data.contenu === 'object') {
                    setDataOperation(responseOperation.data.contenu);
                } else {
                    throw new Error('Les données récupérées ne sont pas un object');
                }
            } catch (err) {
                setError(err);
            } finally {
                setLoadingOperation(false);
            }
        };

        fetchDataOperation();
    }, [idappOperation]);

    // Fetch status data, after operation data is available
    useEffect(() => {
        if (dataOperation && dataOperation.appAppareil && dataOperation.appAppareil.idappStatut) {
            const fetchDataStatut = async () => {
                try {
                    const responseStatut = await axios.get(`${localStorage.getItem("URLServeur")}/app/statut/${dataOperation.idappStatut}`, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('Token')}`,
                            SousEntites: '1'
                        }
                    });

                    if (responseStatut.data.contenu && typeof responseStatut.data.contenu === 'object') {
                        setDataStatut(responseStatut.data.contenu);
                    } else {
                        throw new Error('Les données récupérées ne sont pas un object');
                    }
                } catch (err) {
                    setError(err);
                } finally {
                    setLoadingStatut(false);
                }
            };

            fetchDataStatut();
        }
    }, [dataOperation]);



    if (error) {
        return <Erreur libelleErreur={error.message} />;
    }

    return (
        <>
            <Header nomimage={"APP_Titre-128-1.png"} urlretour={`/appareils/${idappAppareil}`} />
            { (loadingOperation || loadingStatut) ? (
                <CircularProgress />
            ) : (
                <div id='contenu'>
                    <div id="header-images">
                        <div id="image-operation">
                            <img id="image" src={getImageOperation(dataOperation.idappNatureOperation, dataOperation.appNatureOperation.nomImage)} alt="Opération" />
                            <p>{dataOperation.appNatureOperation.designationNatureOperation}</p>
                        </div>
                        <div id="image-statut">
                            <img id="image" src={require(`../../assets/Images/APP_Statut${dataOperation.idappStatut}-128-1.png`)} alt="Statut" />
                            <p>{dataStatut.designationStatut}</p>
                        </div>
                        
                       
                    </div>

                    <div>
                        <TextFieldReadonly libelle="Appareil Concerné" valeur={`${dataOperation.appAppareil.numeroAppareil} ${dataOperation.appAppareil.designationAppareil}`} />
                        <TextFieldReadonly libelle="Date" valeur={dataOperation.dateOperation ? new Date(dataOperation.dateOperation).toLocaleDateString() : 'N/A'} />
                        <TextFieldReadonly libelle="Heure" valeur={`${dataOperation.heureOperation.slice(0, 2)}:${dataOperation.heureOperation.slice(2, 4)}:${dataOperation.heureOperation.slice(4, 6)}`} />
                        <TextFieldReadonly libelle="Intervenant" valeur={dataOperation.nomIntervenant} />
                        <TextFieldReadonly libelle="Remarque" valeur={dataOperation.remarqueAChaud} />
                    </div>
                </div>
            )}
        </>
    );

};