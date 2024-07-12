import React from "react";
import { Grid, styled } from "@mui/material";
import NavBar from "../../components/NavBar";
import ButtonMenu from "../../screens/HomeScreen/ButtonMenu";

const GridContainer = styled(Grid)(({ theme }) => ({}));

const HomeScreen = (props) => {
    return (
        <React.Fragment>
            <NavBar title={"Gran Coffee"} />
            <GridContainer container spacing={1}>
                <ButtonMenu />
            </GridContainer>
        </React.Fragment>
    );
};

export default HomeScreen;
