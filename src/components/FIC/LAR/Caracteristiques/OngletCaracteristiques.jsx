﻿import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../APP/Caracteristiques/OngletCaracteristiques.css'
import CircularProgress from '../../../ChampsUISimples/CircularProgress';
import BlocData from '../../../ChampsUISimples/BlocData';
import Erreur from '../../../ChampsUISimples/Erreur'

const LARCOFIC_OngletCaracteristiques = (props) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState([]);
    const [nbresult, setnbResult] = useState(0);

    const RechercherCaracteristiques = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.get(`${localStorage.getItem('URLServeur')}/lar/article/${props.id}/caracteristiques`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('Token')}`,
                }
            });

            if (Array.isArray(response.data.contenu)) {
                setData(response.data.contenu);
                setnbResult(response.data.contenu.length);
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
        RechercherCaracteristiques();
    }, [props.id]);

    if (error) {
        return <Erreur libelleErreur={error.message} />;
    }

    return (
        <div className='tab'>
            <p className='titreonglet'>CARACTERISTIQUES</p>
            <div className='headeroperations'>
                <p className='nbresultat'>{nbresult} caractéristiques</p>
            </div>

            {loading ? (
                <CircularProgress />
            ) : (
                data.map((item) => (
                    <BlocData ligne1={item.designationCaract} ligne2={item.valeurCaract} />
                ))
            )}
        </div>
    );
};

export default LARCOFIC_OngletCaracteristiques;