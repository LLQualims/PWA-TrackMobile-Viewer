import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ChampDetailCadre from '../FIC/APP/General/ChampDetailCadre';

export default function InfosBdd() {

    const [dataBdd, setDataBdd] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchDataBdd = async () => {
        try {
            const responseInfosBdd = await axios.get(`${localStorage.getItem("URLServeur")}/infos/bdd`);

            if (responseInfosBdd.data.contenu && typeof responseInfosBdd.data.contenu === 'object') {
                setDataBdd(responseInfosBdd.data.contenu);
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
        fetchDataBdd();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }
    return (
        <div>
                <ChampDetailCadre libelle='Propriétaire' valeur=''></ChampDetailCadre>
                <ChampDetailCadre libelle='Licence' valeur=''></ChampDetailCadre>
                <ChampDetailCadre libelle='Base' valeur={dataBdd.Moteur_Instance}></ChampDetailCadre>
                <ChampDetailCadre libelle='Source' valeur={dataBdd.Nom_Bdd}></ChampDetailCadre>
                <ChampDetailCadre libelle='Utilisateur' valeur={dataBdd.Utilisateur_Instance}></ChampDetailCadre>
                <ChampDetailCadre libelle='Version de lapplication' valeur=''></ChampDetailCadre>
        </div>
    );
}