import React from "react";
import { Grid, styled } from "@mui/material";
const GridContainer = styled(Grid)(({ theme }) => ({
    backgroundColor: "black",
    height: "100%",
    width: "100%",
    borderRadius: "5px",
    margin: theme.spacing(1),
}));
function ContainerWhite({ children, ...props }) {
    return (
        <GridContainer container {...props} spacing={1}>
            {children}
        </GridContainer>
    );
}

export default ContainerWhite;
