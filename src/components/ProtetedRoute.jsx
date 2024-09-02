import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Vérifier si l'URL est présente dans le localStorage
    const URLServeurLocalStorage = localStorage.getItem('URLServeur');

    if (!URLServeurLocalStorage && location.pathname !== '/connexionserveur') {
      // Si l'URL n'est pas trouvée, rediriger vers la page de connexion au serveur
      navigate('/connexionserveur', { state: { from: location.pathname } });
    }
  }, [navigate, location.pathname]); // Dépendances

  return children; // Rend le contenu des routes protégées
};

export default ProtectedRoute;

