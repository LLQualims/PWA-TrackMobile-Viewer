import React, { useState } from "react";
import { TextField, Box, Button, Typography, Container } from "@mui/material";
import { useNavigate } from 'react-router-dom';

const STDLogin = () => {
    const [identifiant, setIdentifiant] = useState("");
    const [motDePasse, setMotDePasse] = useState("");
    const [responseMessage, setResponseMessage] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('jwtToken'));
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault(); 

        // Adaptation de l'objet data pour correspondre à la structure attendue
        const data = {
            login: identifiant,
            password: motDePasse
        };

        try {
            const response = await fetch('http://192.168.39.68:4500/8.1b/connexion', { // Remplace par l'URL de ton API
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                const result = await response.json();
                const token = result.contenu;
                 // Stocker le token dans localStorage
                 localStorage.setItem('jwtToken', token);
                 setIsAuthenticated(true);
                 setResponseMessage("Connexion réussie !");
                 navigate('/scan');
            } else {
                const result = await response.json();
                const errorMessage = result.contenu;
                setResponseMessage(`${errorMessage}`);
            }
        } catch (error) {
            setResponseMessage(`Erreur réseau: ${error.message}`);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('jwtToken');
        setIsAuthenticated(false);
        setResponseMessage("Déconnexion réussie !");
        navigate('/login'); // Redirection vers la page de connexion ou accueil
    };

    return (
        <Container maxWidth="xs" style={{ marginTop: '50px' }}>
            <Box 
                display="flex" 
                flexDirection="column" 
                alignItems="center" 
                boxShadow={3} 
                p={4} 
                borderRadius={2}
                bgcolor="background.paper"
            >
                <Typography variant="h4" component="h2" gutterBottom>
                    Connexion
                </Typography>
                {!isAuthenticated ? (
                    <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                        <TextField 
                            id="identifiant" 
                            label="Identifiant" 
                            variant="outlined" 
                            margin="normal"
                            fullWidth 
                            value={identifiant}
                            onChange={(e) => setIdentifiant(e.target.value)}
                        />
                        <TextField 
                            id="motDePasse" 
                            label="Mot de passe" 
                            type="password" 
                            variant="outlined" 
                            margin="normal" 
                            fullWidth 
                            value={motDePasse}
                            onChange={(e) => setMotDePasse(e.target.value)}
                        />
                        <Button 
                            variant="contained" 
                            color="primary" 
                            type="submit" 
                            fullWidth 
                            style={{ marginTop: '20px' }}
                        >
                            Connexion
                        </Button>
                    </form>
                ) : (
                    <Button 
                        variant="contained" 
                        color="secondary" 
                        onClick={handleLogout} 
                        fullWidth 
                        style={{ marginTop: '20px' }}
                    >
                        Déconnexion
                    </Button>
                )}
                 {responseMessage && (
                    <Box mt={2}>
                        <Typography variant="body1" color="textSecondary">
                            {responseMessage}
                        </Typography>
                    </Box>
                )}
            </Box>
        </Container>
    );
};

export default STDLogin;
