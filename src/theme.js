import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    LABSTOCK: {
      main: '#5ec7e4', // 100%
      fade: '#e9f4fa', // 20%
    },
    EQM: {
      main: '#6fbd84', //100%
      fade: '#eaf2e9' ,//20%
    },
    primary: {
      main: '#00759C'
    }
  },
});

export default theme;