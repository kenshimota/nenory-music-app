import * as React from "react";
import Grid from "@mui/material/Grid";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import styled from "@mui/material/styles/styled";

import MenuIcon from "@mui/icons-material/Menu";
import ButtonExit from "../../components/ButtonExit";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../Auth";

const TypographyCustom = styled(Typography)(({ theme }) => ({
    color: theme.palette.background.paper,
}));

const IconButtonCustom = styled(IconButton)(({ theme }) => ({
    color: theme.palette.background.paper,
}));

const ButtonExitCustom = styled(ButtonExit)(({ theme }) => ({
    color: theme.palette.background.paper,
}));

function BackButton({ onBack, ...props }) {
    const navigate = useNavigate();

    const onClick = () => {
        if (onBack) {
            onBack();
            return;
        }

        navigate(-1);
    };

    return (
        <IconButtonCustom
            {...props}
            onClick={onClick}
            size="medium"
            edge="start"
            sx={{ mr: 2 }}
        >
            <ArrowBackIcon fontSize="inherit" />
        </IconButtonCustom>
    );
}

export default function SearchAppBar({ subtitle, isBack, onBack }) {
    const { session } = useAuth();

    return (
        <AppBar position="fixed">
            <Toolbar>
                <Grid container justifyContent="space-between">
                    <Grid item>
                        <Grid container>
                            {session && !isBack && (
                                <IconButtonCustom
                                    size="medium"
                                    edge="start"
                                    color="inherit"
                                    aria-label="open drawer"
                                    sx={{ mr: 2 }}
                                >
                                    <MenuIcon />
                                </IconButtonCustom>
                            )}{" "}
                            {session && isBack && (
                                <BackButton onBack={onBack} />
                            )}
                        </Grid>
                    </Grid>
                    <Grid item>
                        <TypographyCustom
                            variant="h6"
                            align="center"
                            noWrap
                            component="div"
                        >
                            Nenory Coffee
                        </TypographyCustom>
                        {subtitle && (
                            <TypographyCustom
                                align="center"
                                variant="subtitle2"
                            >
                                {subtitle}
                            </TypographyCustom>
                        )}
                    </Grid>
                    <Grid item>{session && <ButtonExitCustom />}</Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    );
}
