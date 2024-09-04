import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import './ChampDetailCadre.css';

export default function ChampDetailCadre({ libelle, valeur }) {

    return (
        <div className="divcadre">
            <TextField
                className="textfieldcadre"
                inputProps={{ readOnly: true }}
                label={libelle}
                defaultValue={valeur} />
        </div>
    );
};