import React from "react";

import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";

import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { Hidden } from "@mui/material";

const FooterPagination = ({
    isBack,
    isNext,
    onBack,
    onNext,
    children,
    ...props
}) => (
    <React.Fragment>
        <Hidden smUp>
            <Grid container justifyContent="space-between">
                <IconButton disabled={!isBack} onClick={onBack}>
                    <ArrowBack />
                </IconButton>
                {children}
                <IconButton disabled={!isBack} onClick={onBack}>
                    <ArrowForward />
                </IconButton>
            </Grid>
        </Hidden>
        <Hidden smDown>
            <Grid container justifyContent="center">
                {children}
            </Grid>
        </Hidden>
    </React.Fragment>
);

export default FooterPagination;
