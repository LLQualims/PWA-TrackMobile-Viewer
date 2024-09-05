import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Fonction pour vérifier le token
    const VerificationTokenValide = async (token) => {
      try {
        const response = await axios.get(`${localStorage.getItem('URLServeur')}/helloworld/ValiditeToken`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return response.status === 200;
      } catch (err) {
        return false;
      }
    };

    const verifierURLetToken = async () => {
      const URLServeurLocalStorage = localStorage.getItem('URLServeur');
      const TokenLocalStorage = localStorage.getItem('Token');

      // Si l'URL du serveur n'est pas présente et l'utilisateur n'est pas sur la page de connexion serveur
      if (!URLServeurLocalStorage && location.pathname !== '/connexionserveur') {
        navigate('/connexionserveur', { state: { from: location.pathname } });
      } else {
        // Si l'URL est présente, vérifier la validité du token
        const tokenValide = await VerificationTokenValide(TokenLocalStorage);
        if (!tokenValide) {
          navigate('/connexionserveur');
        }
      }
    };

    verifierURLetToken();
  }, [navigate, location.pathname]); // Dépendances

  return children; // Rend le contenu des routes protégées
};

export default ProtectedRoute;