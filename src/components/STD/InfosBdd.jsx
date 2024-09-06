import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TextFieldReadonly from '../ChampsUISimples/TextFieldReadonly';

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
            <TextFieldReadonly libelle='Propriétaire' valeur=''></TextFieldReadonly>
            <TextFieldReadonly libelle='Licence' valeur=''></TextFieldReadonly>
            <TextFieldReadonly libelle='Base' valeur={dataBdd.Moteur_Instance}></TextFieldReadonly>
            <TextFieldReadonly libelle='Source' valeur={dataBdd.Nom_Bdd}></TextFieldReadonly>
            <TextFieldReadonly libelle='Utilisateur' valeur={dataBdd.Utilisateur_Instance}></TextFieldReadonly>
            <TextFieldReadonly libelle='Version de lapplication' valeur=''></TextFieldReadonly>
        </div>
    );
}