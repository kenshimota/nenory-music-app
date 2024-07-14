import React from "react";
import { Grid, styled } from "@mui/material";

import NavBar from "../NavBar";

const GridContainer = styled(Grid)(({ theme }) => ({
    height: "100%",
    width: "100%",
    position: "relative",
}));
const GridContent = styled(Grid)(({ theme }) => ({
    marginTop: theme.spacing(9),
    height: "calc(100% - 80px)",
    position: "relative",
    width: "100%",
}));

const MainPage = ({ children, ...props }) => {
    return (
        <React.Fragment>
            <NavBar {...props} />
            <GridContent container>
                <GridContainer item xs={12}>
                    {children}
                </GridContainer>
            </GridContent>
        </React.Fragment>
    );
};

export default MainPage;
