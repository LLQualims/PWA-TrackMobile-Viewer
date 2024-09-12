import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './OngletFDS.css'
import TextFieldReadonly from '../../../ChampsUISimples/TextFieldReadonly';
import Bloc5Images from '../../../ChampsUISimples/Bloc5Images';
import CircularProgress from '../../../ChampsUISimples/CircularProgress';
import Erreur from '../../../ChampsUISimples/Erreur';

const LARCOFIC_OngletFDS = (props) => {

    const [dataArticle, setDataArticle] = useState([]);
    const [dataDangers, setDataDangers] = useState([]);
    const [dataEPI, setDataEPI] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const rechercheArticle = async () => {
        try {
            const response = await axios.get(`${localStorage.getItem("URLServeur")}/lar/conditionnement/${props.id}`, {
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

    const rechercheDangers = async () => {
        try {
            const response = await axios.get(`${localStorage.getItem("URLServeur")}/lar/article/${props.id}/dangers`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('Token')}`,
                    SousEntites: '1'
                }
            });

            if (Array.isArray(response.data.contenu)) {
                setDataDangers(response.data.contenu.map((lardanger) => lardanger.stdDanger));
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
        rechercheArticle();
        rechercheDangers();
    }, []);

    if (error) {
        return <Erreur libelleErreur={error.message} />;
    }

    return (
        <div className='tab'>
            <p className='titreonglet'>FICHE DE DONNÉES DE SÉCURITÉ</p>

            {loading ? (
                <CircularProgress />
            ) : (
                    <div className='infosgeneral'>
                        <TextFieldReadonly libelle="Article" valeur={dataArticle.larArticle ? dataArticle.larArticle.designationArticle : ""} />

                        <div id="div_dangers">
                            <Bloc5Images
                                titre="Danger"
                                image1={require(`../../../../assets/Images/STD_SGH01-128-1.png`)}
                                image2={require(`../../../../assets/Images/STD_SGH01-128-1.png`)}
                                image3={require(`../../../../assets/Images/STD_SGH01-128-1.png`)}
                                image4={require(`../../../../assets/Images/STD_SGH01-128-1.png`)}
                                image5={require(`../../../../assets/Images/STD_SGH02-128-1.png`)} />

                            <Bloc5Images
                                titre="EPI"
                                image1={require(`../../../../assets/Images/STD_EPIBody-64-1.png`)}
                                image2={require(`../../../../assets/Images/STD_EPIBody-64-1.png`)}
                                image3={require(`../../../../assets/Images/STD_EPIBody-64-1.png`)}
                                image4={require(`../../../../assets/Images/STD_EPIBody-64-1.png`)}
                                image5={require(`../../../../assets/Images/STD_EPIBody-64-1.png`)} />
                        </div>
                    </div>
            )}
        </div>
    );

}

export default LARCOFIC_OngletFDS;