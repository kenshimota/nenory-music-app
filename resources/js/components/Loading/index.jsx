import * as React from "react";

import Grid from "@mui/material/Grid";
import styled from "@mui/material/styles/styled";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";

const BoxCustom = styled(Grid)(({ theme }) => ({
    display: "flex",
    justifyContent: "100%",
    height: "100%",
}));

function Loading({ text }) {
    return (
        <BoxCustom container justifyContent="center" alignContent="center">
            <Grid item>
                <Grid container>
                    <Grid item xs={12}>
                        <Grid container justifyContent="center">
                            <CircularProgress size={60} />
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography color="primary" align="center">
                            {text || "Cargando..."}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </BoxCustom>
    );
}

export default Loading;
