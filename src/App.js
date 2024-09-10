import './App.css';
import React from 'react';
import { BrowserRouter, Route, Routes} from 'react-router-dom';

// Pages
import BarcodeReader from './pages/STDSCAN/STDSCAN';
import FenPrincipale from './pages/FENPRIN/FENPRIN';
import FenConnexionServeur from './pages/STDConnexionServeur/STDConnexionServeur';
import STDApropos from './pages/STDApropos/STDAPropos';
import APPAPFIC from './pages/APPAPFIC/APPAPFIC';
import LARCOFIC from './pages/LARCOFIC/LARCOFIC';
import STDLogin from './pages/STDLOGIN/STDLOGIN';
import NotFound from './pages/ERREUR/NotFound';


// Components
import ProtectedRoute from './components/ProtetedRoute';
// UI
import { ThemeProvider } from '@mui/material/styles'; 
import theme from './theme';

function App() {

  return (
    <ThemeProvider theme={theme}>
        <BrowserRouter>
            <Routes>
                <Route index element={<ProtectedRoute><FenPrincipale/></ProtectedRoute>} />
                <Route path="/connexionserveur" element={<ProtectedRoute><FenConnexionServeur/></ProtectedRoute>} />
                <Route path="/login" element={<ProtectedRoute><STDLogin /></ProtectedRoute>} />
                <Route path="apropos" element={<ProtectedRoute><STDApropos/></ProtectedRoute>} />
                <Route path="*" element={<ProtectedRoute><NotFound/></ProtectedRoute>} />
                <Route path="/scan" element={<ProtectedRoute><BarcodeReader /></ProtectedRoute>} />
                <Route path="/appareils/:idappAppareil" element={<ProtectedRoute><APPAPFIC /></ProtectedRoute>} />
                <Route path="/conditionnements/:idlarConditionnement" element={<ProtectedRoute><LARCOFIC /></ProtectedRoute>} />
            </Routes>
        </BrowserRouter>
    </ThemeProvider>  
  );
}

export default App;
