import React from "react";
import { Grid } from "@mui/material";
import TobbalUsers from "./TobbalUsers";
import ContainerWhite from "../../components/ContainerWhite";

function ShowListUsers() {
    return (
        <Grid container spacing={1}>
            <TobbalUsers />
            <ContainerWhite />
            <p>hola jessy</p>
        </Grid>
    );
}

export default ShowListUsers;
