import React, { useState } from 'react';
import { Box, TextField } from '@mui/material';

function HTMLInput({ libelle, valeur }) {
  const [value, setValue] = useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <Box
    sx={{
      p: 2,
      border: '1px solid',
      borderColor: 'grey.400',
      borderRadius: 1,
      backgroundColor: 'background.paper',
    }}
  >
    <div dangerouslySetInnerHTML={{ __html: valeur }} />
    {/* Optionnel: Vous pouvez ajouter un helper text ou un message d'erreur ici */}
  </Box>
  );
}

export default HTMLInput;

