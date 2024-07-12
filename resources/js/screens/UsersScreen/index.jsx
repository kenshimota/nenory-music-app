import React from "react";
import { Grid, styled } from "@mui/material";
import NavBar from "../../components/NavBar";
import ShowListUsers from "./ShowListUsers";

// hola
const GridContainer = styled(Grid)(({ theme }) => ({
    margin: theme.spacing(1),
    padding: theme.spacing(3),
}));
const UsersScreen = (props) => {
    return (
        <React.Fragment>
            <NavBar title={"Usuarios"} isBack />
            <GridContainer container spacing={1} justifyContent="flex-end">
                <Grid>
                    <ShowListUsers />
                </Grid>
            </GridContainer>
        </React.Fragment>
    );
};

export default UsersScreen;
