import './ChampsUISimples.css';
import { useNavigate } from 'react-router-dom';

export default function BlocData({ ligne1, ligne2, image, altImage, urlDestination }) {

    const navigate = useNavigate();

    function Image() {
        if (image === undefined) {
            return null;
        }

        return <img src={image} alt={altImage} className="blocdata_image" />;
    }

    function Texte() {
        return (
            <div className='blocdata_div'>
                <p className='blocdata_ligne1'>{ligne1}</p>
                <p className='blocdata_ligne2'>{ligne2}</p>
            </div>
        );
    }
    function Bouton() {
        if (urlDestination === undefined) {
            return (
                <button className='blocdata_bouton' type="button">
                    <Image />
                    <Texte />
                </button>
            );
        }

        return (
            <button className='blocdata_bouton' type="button" onClick={() => navigate(`${urlDestination}`)} >
                <Image />
                <Texte />
            </button>
        );
    }

    return <Bouton/>
};