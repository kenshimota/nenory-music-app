import React from "react";
import { Grid, styled } from "@mui/material";
import NavBar from "../../components/NavBar";
import ButtonMenu from "../../screens/HomeScreen/ButtonMenu";

const GridContainer = styled(Grid)(({ theme }) => ({}));

const HomeScreen = (props) => {
    return (
        <GridContainer container spacing={1}>
            <NavBar title={"Gran Coffee"} />
            <ButtonMenu />
        </GridContainer>
    );
};

export default HomeScreen;
