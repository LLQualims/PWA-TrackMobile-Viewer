import TextField from '@mui/material/TextField';
import './ChampsUISimples.css';

export default function TextFieldReadonly({ libelle, valeur }) {

    if (valeur === undefined || valeur === '') { valeur = " "; }

    return (
        <div className="textfieldreadonly_div">
            <TextField
                className="textfieldreadonly_textfield"
                inputProps={{ readOnly: true }}
                label={libelle}
                multiline
                defaultValue={valeur}
                sx={{
                    // change label and border color when readonly
                    "&:has([readonly]) ": {
                        "& .MuiInputLabel-outlined": {
                            color: "#cecece",
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#cecece",
                        },
                    },
                }}            />
                
        </div>
    );
};