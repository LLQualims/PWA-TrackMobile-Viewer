import TextField from '@mui/material/TextField';
import './ChampsUISimples.css';

export default function TextFieldReadonly({ libelle, valeur }) {

    return (
        <div className="textfieldreadonly_div">
            <TextField
                className="textfieldreadonly_textfield"
                inputProps={{ readOnly: true }}
                label={libelle}
                multiline
                defaultValue={valeur} />
                
        </div>
    );
};