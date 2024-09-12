import React from 'react';
import { useParams } from 'react-router-dom';
import './LARCOFIC.css';

import MenuOnglets from '../../components/FIC/LAR/MenuOnglets/MenuOnglets';

export default function LARCOFIC() {

    const { idlarConditionnement } = useParams();

    return (
        <div>
            <MenuOnglets idlarConditionnement={idlarConditionnement} />
        </div>
    )

}