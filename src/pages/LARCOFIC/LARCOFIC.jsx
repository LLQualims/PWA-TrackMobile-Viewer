import { useParams } from 'react-router-dom';
import LARCOFIC_OngletHistorique from "../../components/FIC/LAR/Historique/OngletHistorique";

export default function LARCOFIC() {
    const { idlarConditionnement } = useParams();

    return <LARCOFIC_OngletHistorique id={idlarConditionnement} />;
}