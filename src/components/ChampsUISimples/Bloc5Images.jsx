import './ChampsUISimples.css';
import TextField from '@mui/material/TextField'

export default function Bloc5Images({ titre, image1, image2, image3, image4, image5 }) {

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
                <img src={image1} className="bloc5images_img1" alt={`${titre} 1`} />
                <img src={image2} className="bloc5images_img2" alt={`${titre} 2`} />

                <img src={image3} className="bloc5images_img3" alt={`${titre} 3`} />

                <img src={image4} className="bloc5images_img4" alt={`${titre} 4`} />
                <img src={image5} className="bloc5images_img5" alt={`${titre} 5`} />
            </div>
        </div>
    );

};