import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Historique/OngletHistorique.css';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';


const OngletCaracteristiques = (props) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState([]);
    const [nbresult, setnbResult] = useState(0);


    useEffect(() => {

        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await axios.get(`${localStorage.getItem('URLServeur')}/app/appareil/${props.id}/caracteristiques`, {
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
        };

        fetchData();
    }, [props.id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className='tabHistorique'>
            <p className='titreonglet'>CARACTERISTIQUES</p>
            <div className='headeroperations'>
                <p className='nbresultat'>{nbresult} caractéristiques</p>
            </div>

            {loading ? (
                <Box sx={{ marginTop: "10%" }}>
                    <CircularProgress />
                </Box>
            ) : (
                data.map((item) => (
                    <button key={item.idappOperation} className='list-item-button' type="button">
                        <div className='contenu'>
                            <p className='natureoperation'>{item.designationCaract}</p>
                            <p className='dateoperation'>{item.valeurCaract}</p>
                        </div>
                    </button>
                ))
            )}
        </div>
    );
};

export default OngletCaracteristiques;