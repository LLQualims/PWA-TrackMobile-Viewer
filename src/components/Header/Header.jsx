import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosNew from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header = ({ nomimage, urlretour }) => {

    const navigate = useNavigate();

    return (
        <Box>
            <AppBar id="appbar">
                <Toolbar id="toolbar">
                    <IconButton id="iconbtn" aria-label="retour">
                        <ArrowBackIosNew onClick={() => {
                            navigate(`${urlretour}`);}} />
                    </IconButton>
                    <img src={require(`../../assets/Images/${nomimage}`)} id="titre" alt="titre" />
                </Toolbar>
            </AppBar>
        </Box>
    )
};

export default Header;