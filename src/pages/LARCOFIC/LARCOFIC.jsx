import { useParams } from 'react-router-dom';
import LARCOFIC_OngletHistorique from "../../components/FIC/LAR/Historique/OngletHistorique";
import LARCOFIC_OngletCaracteristiques from '../../components/FIC/LAR/Caracteristiques/OngletCaracteristiques';

export default function LARCOFIC() {
    const { idlarConditionnement } = useParams();

    return <LARCOFIC_OngletCaracteristiques id={idlarConditionnement} />;
}