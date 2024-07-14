import React from "react";
import { Grid, styled } from "@mui/material";
import NavBar from "../../components/NavBar";
import ShowListUsers from "./ShowListUsers";
import MainPage from "../../components/MainPage";

// hola
const GridContainer = styled(Grid)(({ theme }) => ({
    height: "100%",
    width: "100%",
    position: "relative",
}));

const GridContent = styled(Grid)(({ theme }) => ({
    marginTop: theme.spacing(9),
    position: "relative",
    height: "calc(100% - 75px)",
    overflow: "auto",
}));

const UsersScreen = (props) => {
    return (
        <MainPage title="Nenory Coffee" subtitle="Usuarios" isBack>
            <ShowListUsers />
        </MainPage>
    );
};

export default UsersScreen;
