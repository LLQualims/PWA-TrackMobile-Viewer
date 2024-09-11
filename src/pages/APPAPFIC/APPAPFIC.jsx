import React from 'react';
import { useParams } from 'react-router-dom';
import './APPAPFIC.css';

import MenuOnglets from '../../components/FIC/APP/MenuOnglets/MenuOnglets';

export default function APPAPFIC() {

  const { idappAppareil } = useParams();

  return (
      <div>
        <MenuOnglets idappAppareil={idappAppareil}/>
      </div>
  )

}