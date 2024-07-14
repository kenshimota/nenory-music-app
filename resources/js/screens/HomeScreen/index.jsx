import React from "react";
import { Grid, styled } from "@mui/material";
import NavBar from "../../components/NavBar";
import ButtonMenu from "../../screens/HomeScreen/ButtonMenu";
import MainPage from "../../components/MainPage";

const GridContainer = styled(Grid)(({ theme }) => ({
    height: "100%",
    width: "100%",
    position: "relative",
}));
const GrindContent = styled(Grid)(({ theme }) => ({
    margin: theme.spacing(9),
    height: "100%",
    width: "100%",
    position: "relative",
    background: "black",
}));
const HomeScreen = (props) => {
    return (
        <MainPage>
            <ButtonMenu />
        </MainPage>
    );
};

export default HomeScreen;
