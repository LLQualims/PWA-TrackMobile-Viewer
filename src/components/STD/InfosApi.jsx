import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ChampDetailCadre from '../FIC/APP/General/ChampDetailCadre';

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
        return <div>Error: {error.message}</div>;
    }
    return (
        <div>
            <ChampDetailCadre libelle='Version du serveur dAPI' valeur={dataApi.Version}></ChampDetailCadre>
            <ChampDetailCadre libelle='URL du serveur' valeur={localStorage.getItem("URLServeur")}></ChampDetailCadre>
            <ChampDetailCadre libelle='Nom de lapplication' valeur='Track Mobile Viewer'></ChampDetailCadre>
        </div>
    );
}