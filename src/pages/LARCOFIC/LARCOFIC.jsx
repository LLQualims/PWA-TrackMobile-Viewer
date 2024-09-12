import { useParams } from 'react-router-dom';
import LARCOFIC_OngletFDS from "../../components/FIC/LAR/FDS/OngletFDS";

export default function LARCOFIC() {
    const { idlarConditionnement } = useParams();

    return <LARCOFIC_OngletFDS id={idlarConditionnement} />;
}