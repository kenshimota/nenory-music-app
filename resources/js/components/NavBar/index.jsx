import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import ButtonExit from "../../components/ButtonExit";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

import { useNavigate } from "react-router-dom";

// boton de hacia atras
function BadButton() {
    const navigate = useNavigate();
    const handleGoBack = () => {
        navigate(-1); // Echar para atrás en la navegación
    };
    return (
        <IconButton
            onClick={handleGoBack}
            aria-label="ArrowBackIos"
            size="large"
        >
            <ArrowBackIosIcon fontSize="inherit" />
        </IconButton>
    );
}

export default function SearchAppBar({ title, isBack }) {
    return (
        <AppBar position="static">
            <Toolbar>
                {!isBack && (
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                )}
                {isBack && <BadButton />}
                <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{
                        flexGrow: 1,
                        display: { xs: "none", sm: "block" },
                    }}
                >
                    {title}
                </Typography>
                <ButtonExit />
            </Toolbar>
        </AppBar>
    );
}
