import './App.css';
import React from 'react';
import { BrowserRouter, Route, Routes} from 'react-router-dom';

// Pages
// STD
import STDFENPRIN from './pages/FENPRIN/FENPRIN';
import STDConnexionServeur from './pages/STDConnexionServeur/STDConnexionServeur';
import STDApropos from './pages/STDApropos/STDAPropos';
import STDLogin from './pages/STDLOGIN/STDLOGIN';
import STDSCAN from './pages/STDSCAN/STDSCAN';
import STDERREUR from './pages/ERREUR/STDERREUR';
// APP
import APPAPFIC from './pages/APPAPFIC/APPAPFIC';
import APPOPFIC from './pages/APPOPFIC/APPOPFIC';
// LAR
import LARCOFIC from './pages/LARCOFIC/LARCOFIC';

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
                <Route path="/" element={<ProtectedRoute><STDFENPRIN/></ProtectedRoute>} />
                <Route path="/connexionserveur" element={<ProtectedRoute><STDConnexionServeur/></ProtectedRoute>} />
                <Route path="/login" element={<ProtectedRoute><STDLogin /></ProtectedRoute>} />
                <Route path="apropos" element={<ProtectedRoute><STDApropos/></ProtectedRoute>} />
                <Route path="/scan" element={<ProtectedRoute><STDSCAN /></ProtectedRoute>} />
                <Route path="/appareils/:idappAppareil" element={<ProtectedRoute><APPAPFIC /></ProtectedRoute>} />
                <Route path="/appareils/:idappAppareil/operations/:idappOperation" element={<ProtectedRoute><APPOPFIC /></ProtectedRoute>} />
                <Route path="/conditionnements/:idlarConditionnement/operations/:idlarOperationCO" element={<ProtectedRoute><LAROPFIC /></ProtectedRoute>} />
                <Route path="*" element={<ProtectedRoute><STDERREUR/></ProtectedRoute>} />
                <Route path="/conditionnements/:idlarConditionnement" element={<ProtectedRoute><LARCOFIC /></ProtectedRoute>} />
            </Routes>
        </BrowserRouter>
    </ThemeProvider>  
  );
}

export default App;
