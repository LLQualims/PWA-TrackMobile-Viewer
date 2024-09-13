import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getCouleurWindev } from '../../../../outils/style'
import '../../APP/Historique/OngletHistorique.css';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import CircularProgress from '../../../ChampsUISimples/CircularProgress';
import BlocData from '../../../ChampsUISimples/BlocData';
import Erreur from '../../../ChampsUISimples/Erreur';


const LARCOFIC_OngletHistorique = (props) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState([]);
    const [nbresult, setnbResult] = useState(0);
    const [archives, setArchives] = useState(false);

    const RechercheHistorique = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.get(`${localStorage.getItem('URLServeur')}/lar/conditionnement/${props.id}/historique`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('Token')}`,
                    SousEntites: '1',
                    Archives: archives ? '1' : '0'
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
        RechercheHistorique();
    }, [archives, props.id]);

    if (error) {
        return <Erreur libelleErreur={error.message} />;
    }

    const getImageOperation = (idlarNatureOperation, nomImage) => {
        let img = nomImage;

        if (idlarNatureOperation < 1 || nomImage === '') { return require('../../../../assets/Images/LAR_OpeStandard-128-1.png'); }

        return require(`../../../../assets/Images/${img.replace("XX-X.XXX", "128-1.png")}`);
    };

    return (
        <div className='tab'>
            <p className='titreonglet'>LISTE DES OPÉRATIONS</p>
            <div className='headeroperations'>
                <p className='nbresultat'>{nbresult} opérations</p>
                <FormControlLabel className='selectarchives' value="start" control={<Switch checked={archives} onChange={(event) => setArchives(event.target.checked)} />} label="Afficher les archives" labelPlacement="start" />
            </div>

            {loading ? (
                <CircularProgress />
            ) : (
                data.map((item) => (
                    <BlocData
                        image={getImageOperation(item.idlarNatureOperationCO, item.larNatureOperationCO.nomImage)}
                        altImage={`Image of ${item.idlarNatureOperationCO}`}
                        ligne1={item.larNatureOperationCO.designationNatureOperation}
                        ligne2={`${new Date(item.dateOperation).toLocaleDateString()} ${item.heureOperation.slice(0, 2)}:${item.heureOperation.slice(2, 4)}:${item.heureOperation.slice(4, 6)}`}
                        couleurStatut={getCouleurWindev(item.larStatutCO?.couleur)}
                        urlDestination={`/conditionnements/${props.id}/operations/${item.idlarOperationCO}`}
                        couleurFleche={ 'LABSTOCK.main' }
                    />
                ))
            )}
        </div>
    );
};

export default LARCOFIC_OngletHistorique;