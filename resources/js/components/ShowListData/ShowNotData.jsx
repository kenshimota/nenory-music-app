import React from "react";

import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import styled from "@mui/material/styles/styled";

import NotFoundImg from "../../../img/not-found.jpeg";

const GridNotFound = styled(Grid)(({ theme }) => ({
    height: "calc(100% - 100px)",
    [theme.breakpoints.down("sm")]: {
        height: "100%",
        maxWidth: "100%",
    },
}));

const ShowNotData = (props) => (
    <GridNotFound container alignContent="center" justifyContent="center">
        <Grid item xs={12}>
            <Grid container justifyContent="center">
                <Avatar
                    src={NotFoundImg}
                    alt="Not Found"
                    variant="square"
                    style={{ height: 200, width: 200 }}
                />
            </Grid>
        </Grid>
        <Grid item xs={12}>
            <Typography
                variant="h6"
                component="p"
                align="center"
                color="primary"
            >
                No se encontraron coincidencias con la información ingresada.
                Verifique e intente nuevamente.
            </Typography>
        </Grid>
    </GridNotFound>
);

export default ShowNotData;
