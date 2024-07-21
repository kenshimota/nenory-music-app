import React from "react";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import styled from "@mui/material/styles/styled";

import MainPage from "../../components/MainPage";

import Image from "../../../img/not-found-page.jpeg";

const GridRoot = styled(Grid)(({ theme }) => ({
    width: "100%",
    height: "100%",
    position: "relative",
    margin: theme.spacing(0),
}));

const NotFoundScreen = (props) => (
    <MainPage title="Nenory Coffee">
        <GridRoot
            container
            spacing={1}
            justifyContent="center"
            alignContent="center"
        >
            <Grid item xs={12}>
                <Grid container justifyContent="center">
                    <Typography variant="h3" color="primary">
                        ��Ups!
                    </Typography>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container justifyContent="center">
                    <Typography variant="h6" color="primary">
                        No se encontró el recurso solicitado.
                    </Typography>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container justifyContent="center">
                    <Avatar
                        src={Image}
                        variant="square"
                        style={{ width: 250, height: 250 }}
                    />
                </Grid>
            </Grid>
        </GridRoot>
    </MainPage>
);

export default NotFoundScreen;
