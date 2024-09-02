// src/serviceWorkerRegistration.js

// Si vous utilisez un environnement de développement, vous pouvez choisir de ne pas enregistrer le service worker.
// Pour l'environnement de production, nous recommandons d'enregistrer le service worker.
const isLocalhost = Boolean(
    window.location.hostname === 'localhost' ||
    window.location.hostname === '[::1]' ||
    window.location.hostname.match(/^127(\.\d{1,3}){3}$/)
  );
  
  function registerValidSW(swUrl) {
    navigator.serviceWorker
      .register(swUrl)
      .then((registration) => {
        registration.onupdatefound = () => {
          const installingWorker = registration.installing;
          if (installingWorker == null) {
            return;
          }
          installingWorker.onstatechange = () => {
            if (installingWorker.state === 'installed') {
              if (navigator.serviceWorker.controller) {
                // Il y a un nouveau contenu disponible.
                console.log('Nouveau contenu disponible; rafraîchissez la page.');
              } else {
                // Le contenu est mis en cache pour le mode hors ligne.
                console.log('Contenu mis en cache pour le mode hors ligne.');
              }
            }
          };
        };
      })
      .catch((error) => {
        console.error('Erreur lors de l\'enregistrement du service worker:', error);
      });
  }
  
  function checkValidServiceWorker(swUrl) {
    fetch(swUrl)
      .then((response) => {
        // Assurez-vous que le fichier service-worker.js existe
        if (response.status === 404 || response.headers.get('content-type')?.indexOf('javascript') === -1) {
          // Le service worker n'existe pas, donc désinscription
          navigator.serviceWorker.ready.then((registration) => {
            registration.unregister().then(() => {
              window.location.reload();
            });
          });
        } else {
          // Service worker valide
          registerValidSW(swUrl);
        }
      })
      .catch(() => {
        console.log('Aucun service worker trouvé. Assurez-vous que le fichier `service-worker.js` est dans le répertoire public.');
      });
  }
  
  export function register(config) {
    if (process.env.NODE_ENV === 'production') {
      // URL du service worker
      const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;
  
      if (isLocalhost) {
        // C'est un environnement localhost, donc nous voulons aussi vérifier si le service worker existe
        checkValidServiceWorker(swUrl);
      } else {
        // Environnement de production
        registerValidSW(swUrl);
      }
    } else {
      console.log('Service worker n\'est pas activé en mode développement.');
    }
  }
  
  export function unregister() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready
        .then((registration) => {
          registration.unregister();
        })
        .catch((error) => {
          console.error(error.message);
        });
    }
  }
  