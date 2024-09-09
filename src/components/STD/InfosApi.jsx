import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TextFieldReadonly from '../ChampsUISimples/TextFieldReadonly';
import Erreur from '../ChampsUISimples/Erreur';

export default function InfosBdd() {

    const [dataApi, setDataApi] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchDataApi = async () => {
        try {
            const responseInfosApi = await axios.get(`${localStorage.getItem("URLServeur")}/infos/api`);

            if (responseInfosApi.data.contenu && typeof responseInfosApi.data.contenu === 'object') {
                setDataApi(responseInfosApi.data.contenu);
            } else {
                throw new Error('Les données récupérées ne sont pas un tableau');
            }
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchDataApi();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <Erreur libelleErreur={error.message}/>;
    }
    return (
        <div>
            <TextFieldReadonly libelle="Version du serveur d'API" valeur={dataApi.Version}></TextFieldReadonly>
            <TextFieldReadonly libelle="URL du serveur" valeur={localStorage.getItem("URLServeur")}></TextFieldReadonly>
            <TextFieldReadonly libelle="Nom de l'application" valeur='Track Mobile Viewer'></TextFieldReadonly>
        </div>
    );
}