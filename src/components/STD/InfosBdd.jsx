import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TextFieldReadonly from '../ChampsUISimples/TextFieldReadonly';
import Erreur from '../ChampsUISimples/Erreur';

export default function InfosBdd() {

    const [dataBdd, setDataBdd] = useState([]);

    const [licence, setLicence] = useState("");
    const [DataEnvSite, setDataEnvSite] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchDataBdd = async () => {
        try {
            const responseInfosBdd = await axios.get(`${localStorage.getItem("URLServeur")}/infos/bdd`);

            if (responseInfosBdd.data.contenu && typeof responseInfosBdd.data.contenu === 'object') {
                setDataBdd(responseInfosBdd.data.contenu);
            } else {
                throw new Error('Les données récupérées ne sont pas un objet');
            }
        } catch (err) {
            setError(err);

        }
    }

    const fetchDataSTDParametre = async () => {
        try {
            const reponseSTDParametre = await axios.get(`${localStorage.getItem("URLServeur")}/std/parametre`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('Token')}`
                }
            });

            if (reponseSTDParametre.data.contenu && typeof reponseSTDParametre.data.contenu === 'object') {
                // Paramètre Licence
                const paramLicence = reponseSTDParametre.data.contenu.find((param) => param.nomParametre === 'NumeroLicenceTM')
                if (paramLicence !== undefined) { setLicence(paramLicence.valeurParametre) }

                // Paramètre Propriétaire
                const paramProprietaire = reponseSTDParametre.data.contenu.find((param) => param.nomParametre === 'PARAGlobalSite')
                if (paramProprietaire !== undefined) { fetchDataEnvSite(paramProprietaire.valeurParametre); }

            } else {
                throw new Error('Les données récupérées ne sont pas un objet');
            }
        } catch (err) {
            setError(err);
        
        }
    }

    const fetchDataEnvSite = async (idEnvSite) => {
        try {
            const responseEnvSite = await axios.get(`${localStorage.getItem("URLServeur")}/env/site/${idEnvSite}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('Token')}`
                }
            });

            if (responseEnvSite.data.contenu && typeof responseEnvSite.data.contenu === 'object') {
                setDataEnvSite(responseEnvSite.data.contenu);
            } else {
                throw new Error('Les données récupérées ne sont pas un objet');
            }
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchDataBdd();
        fetchDataSTDParametre();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <Erreur libelleErreur={error.message} />;
    }
    return (
        <div>
            <TextFieldReadonly libelle='Propriétaire' valeur={DataEnvSite ? DataEnvSite.designationSite : ''}></TextFieldReadonly>
            <TextFieldReadonly libelle='Licence' valeur=''></TextFieldReadonly>
            <TextFieldReadonly libelle='Base' valeur={dataBdd.Moteur_Instance}></TextFieldReadonly>
            <TextFieldReadonly libelle='Source' valeur={dataBdd.Nom_Bdd}></TextFieldReadonly>
            <TextFieldReadonly libelle='Utilisateur' valeur={dataBdd.Utilisateur_Instance}></TextFieldReadonly>
            <TextFieldReadonly libelle="Version de l'application" valeur={global.VersionApplication}></TextFieldReadonly>
        </div>
    );
}