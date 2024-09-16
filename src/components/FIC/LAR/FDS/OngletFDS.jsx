import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getTraductionWindev } from '../../../../outils/style'
import './OngletFDS.css'
import TextFieldReadonly from '../../../ChampsUISimples/TextFieldReadonly';
import Bloc5ImagesLigne from '../../../ChampsUISimples/Bloc5ImagesLigne';
import CircularProgress from '../../../ChampsUISimples/CircularProgress';
import Erreur from '../../../ChampsUISimples/Erreur';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const LARCOFIC_OngletFDS = (props) => {

    const [dataArticle, setDataArticle] = useState([]);
    const [dataDangers, setDataDangers] = useState([]);
    const [dataEPI, setDataEPI] = useState([]);
    const [dataRisques, setDataRisques] = useState([]);
    const [dataSecurites, setDataSecurites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    let idLarArticle;

    const rechercheArticle = async () => {
        try {
            const response = await axios.get(`${localStorage.getItem("URLServeur")}/lar/conditionnement/${props.id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('Token')}`
                }
            });

            if (response.data.contenu && typeof response.data.contenu === 'object') {
                setDataArticle(response.data.contenu);
                idLarArticle = response.data.contenu.idlarArticle;
                rechercheDangers();
                rechercheEPI();
                rechercheRisques();
                rechercheSecurites();
            } else {
                throw new Error('Les données récupérées ne sont pas un objet');
            }
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }

    const rechercheDangers = async () => {
        try {
            const response = await axios.get(`${localStorage.getItem("URLServeur")}/lar/article/${idLarArticle}/dangers`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('Token')}`
                }
            });

            if (Array.isArray(response.data.contenu)) {
                setDataDangers(response.data.contenu);
            } else {
                throw new Error('Les données récupérées ne sont pas un tableau');
            }
        } catch (err) {
            setError(err);
        }
    }

    const rechercheEPI = async () => {
        try {
            const response = await axios.get(`${localStorage.getItem("URLServeur")}/lar/article/${idLarArticle}/EPIs`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('Token')}`
                }
            });

            if (Array.isArray(response.data.contenu)) {
                setDataEPI(response.data.contenu);
            } else {
                throw new Error('Les données récupérées ne sont pas un tableau');
            }
        } catch (err) {
            setError(err);
        }
    }

    const rechercheRisques = async () => {
        try {
            const response = await axios.get(`${localStorage.getItem("URLServeur")}/lar/article/${idLarArticle}/risques`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('Token')}`,
                    SousEntites: '1'
                }
            });

            if (Array.isArray(response.data.contenu)) {
                setDataRisques(response.data.contenu);
            } else {
                throw new Error('Les données récupérées ne sont pas un tableau');
            }
        } catch (err) {
            setError(err);
        }
    }

    const rechercheSecurites = async () => {
        try {
            const response = await axios.get(`${localStorage.getItem("URLServeur")}/lar/article/${idLarArticle}/securites`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('Token')}`,
                    SousEntites: '1'
                }
            });

            if (Array.isArray(response.data.contenu)) {
                setDataSecurites(response.data.contenu);
            } else {
                throw new Error('Les données récupérées ne sont pas un tableau');
            }
        } catch (err) {
            setError(err);
        }
    }

    useEffect(() => {
        rechercheArticle();
    }, []);

    if (error) {
        return <Erreur libelleErreur={error.message} />;
    }

    const ImagesDangers = () => {
        if (dataDangers.length > 0) {
            return (
                <Bloc5ImagesLigne
                    titre="Danger"
                    image1={dataDangers[0] && require(`../../../../assets/Images/STD_${dataDangers[0].codeDanger}-128-1.png`)}
                    image2={dataDangers[1] && require(`../../../../assets/Images/STD_${dataDangers[1].codeDanger}-128-1.png`)}
                    image3={dataDangers[2] && require(`../../../../assets/Images/STD_${dataDangers[2].codeDanger}-128-1.png`)}
                    image4={dataDangers[3] && require(`../../../../assets/Images/STD_${dataDangers[3].codeDanger}-128-1.png`)}
                    image5={dataDangers[4] && require(`../../../../assets/Images/STD_${dataDangers[4].codeDanger}-128-1.png`)} />
            )
        }
        return <Bloc5ImagesLigne titre="Danger" image3={require(`../../../../assets/Images/STD_SPEVI-48-1.png`)} />
    }

    const ImagesEPI = () => {
        if (dataEPI.length > 0) {
            return (
                <Bloc5ImagesLigne
                    titre="EPI"
                    image1={dataEPI[0] && require(`../../../../assets/Images/STD_EPI${dataEPI[0].codeEPI}-64-1.png`)}
                    image2={dataEPI[1] && require(`../../../../assets/Images/STD_EPI${dataEPI[1].codeEPI}-64-1.png`)}
                    image3={dataEPI[2] && require(`../../../../assets/Images/STD_EPI${dataEPI[2].codeEPI}-64-1.png`)}
                    image4={dataEPI[3] && require(`../../../../assets/Images/STD_EPI${dataEPI[3].codeEPI}-64-1.png`)}
                    image5={dataEPI[4] && require(`../../../../assets/Images/STD_EPI${dataEPI[4].codeEPI}-64-1.png`)} />
            )
        }
        return <Bloc5ImagesLigne titre="EPI" image3={require(`../../../../assets/Images/STD_SPEVI-48-1.png`)} />
    }

    return (
        <div className='tab'>
            <p className='titreonglet'>FICHE DE DONNÉES DE SÉCURITÉ</p>

            {loading ? (
                <CircularProgress />
            ) : (
                <div className='infos'>
                    <TextFieldReadonly libelle="ARTICLE" valeur={dataArticle.larArticle ? dataArticle.larArticle.designationArticle : ""} />

                    <div id="div_dangers">
                        <ImagesDangers />
                        <ImagesEPI />
                    </div>

                    <div id='tableaux-fds'>
                        <p className="titre_section">CODE DE RISQUE</p>

                        <TableContainer component={Paper}>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={{ fontWeight: 1000 }}>Code</TableCell>
                                        <TableCell style={{ fontWeight: 1000 }}>Mention</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {dataRisques.map((risque) => (
                                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                                            <TableCell component="th" scope="row">{risque.stdRisque.codeRisque} </TableCell>
                                            <TableCell>{getTraductionWindev(risque.stdRisque.mentionTraduction)}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                        <p className="titre_section">CODE DE DANGER</p>

                        <TableContainer component={Paper}>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={{ fontWeight: 1000 }}>Code</TableCell>
                                        <TableCell style={{ fontWeight: 1000 }}>Mention</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {dataSecurites.map((securite) => (
                                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                                            <TableCell component="th" scope="row">{securite.stdSecurite.codeSecurite} </TableCell>
                                            <TableCell>{getTraductionWindev(securite.stdSecurite.mentionTraduction)}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                    </div>

                </div>
            )}
        </div>
    );

}

export default LARCOFIC_OngletFDS;