import React from "react";
import { Grid, styled } from "@mui/material";
const GridContainer = styled(Grid)(({ theme }) => ({
    backgroundColor: "#F0F0F0",
    borderRadius: "5px",
    margin: theme.spacing(1),
}));
function ContainerWhite(prosp) {
    return (
        <GridContainer {...prosp} container>
            <p>HOLA SOY EL CONTENEDOR</p>
        </GridContainer>
    );
}

export default ContainerWhite;
