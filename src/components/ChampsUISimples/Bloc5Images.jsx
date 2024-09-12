import './ChampsUISimples.css';
import TextField from '@mui/material/TextField'

export default function Bloc5Images({ titre, image1, image2, image3, image4, image5 }) {

    function DonneBaliseImage({ srcImage, classNameCSS, titre }) {
        if (srcImage === undefined) { return null; }

        return <img src={srcImage} className={classNameCSS} alt={titre} />
    }

    return (
        <div className="bloc5images_div">
            <TextField sx={{ innerHeight: 50 }}
                className="bloc5images_textfield"
                inputProps={{ readOnly: true }}
                label={titre}
                defaultValue=' '
                inputProps={{ style: { height: 320 } }} >                
            </TextField>

            <div className="bloc5images_divimages">
                <DonneBaliseImage srcImage={image1} classNameCSS="bloc5images_img1" titre={`${titre} 1`} />
                <DonneBaliseImage srcImage={image2} classNameCSS="bloc5images_img2" titre={`${titre} 2`} />

                <DonneBaliseImage srcImage={image3} classNameCSS="bloc5images_img3" titre={`${titre} 3`} />

                <DonneBaliseImage srcImage={image4} classNameCSS="bloc5images_img4" titre={`${titre} 4`} />
                <DonneBaliseImage srcImage={image5} classNameCSS="bloc5images_img5" titre={`${titre} 5`} />
            </div>
        </div>
    );

};