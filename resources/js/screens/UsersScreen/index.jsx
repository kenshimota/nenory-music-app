import React from "react";
import { Grid, styled } from "@mui/material";
import NavBar from "../../components/NavBar";
// hola
const GridContainer = styled(Grid)(({ theme }) => ({}));
const UsersScreen = (props) => {
    return (
        <GridContainer container spacing={1}>
            <NavBar title={"Usuarios"} isBack />
        </GridContainer>
    );
};

export default UsersScreen;
