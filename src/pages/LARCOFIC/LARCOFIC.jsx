import { useParams } from 'react-router-dom';
import LARCOFIC_OngletGeneral from "../../components/FIC/LAR/General/OngletGeneral";

export default function LARCOFIC() {
    const { idlarConditionnement } = useParams();

    return <LARCOFIC_OngletGeneral id={idlarConditionnement} />;
}