import React from "react";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Hidden from "@mui/material/Hidden";
import Typography from "@mui/material/Typography";

import styled from "@mui/material/styles/styled";

import AvatarCoffee from "../../../img/avatar-login.jpg";
import CoffeeLoginImg from "../../../img/banner-coffee.jpg";
import StepForgetPassword from "./StepForgetPassword";

const GridRoot = styled(Grid)(({ theme }) => ({
    position: "relative",
    height: "100%",
    borderRadius: 10,
    maxWidth: 1000,
    maxHeight: 700,
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
    [theme.breakpoints.down("sm")]: {
        maxHeight: "auto",
        padding: theme.spacing(1),
    },
}));

const GridImg = styled(Grid)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    backgroundImage: `url(${CoffeeLoginImg})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    [theme.breakpoints.down("sm")]: {
        display: "none",
    },
}));

const GridForm = styled(Grid)(({ theme }) => ({
    padding: theme.spacing(1),
    maxHeight: "100%",
    overflow: "auto",
}));

const GridContainerForm = styled(Grid)(({ theme }) => ({
    height: "100%",
    position: "100%",
}));

const GridScreen = styled(Grid)(({ theme }) => ({
    height: "100%",
    position: "100%",
    background: theme.palette.primary.main,
}));

const AvatarDesign = styled(Avatar)(({ theme }) => ({
    height: 100,
    width: 100,

    [theme.breakpoints.down("sm")]: {
        height: 70,
        width: 70,
    },
}));

const GridItemForms = styled(Grid)(({ theme }) => ({
    height: "calc(100% - 150px)",
    position: "relative",
    overflow: "hidden",
    [theme.breakpoints.down("sm")]: {
        height: "calc(100% - 100px)",
    },
}));

const ForgetPasswordScreen = () => {
    return (
        <GridScreen container justifyContent="center" alignItems="center">
            <GridRoot container>
                <GridImg item xs={12} md={6} />
                <GridForm item xs={12} md={6}>
                    <GridContainerForm
                        container
                        alignItems="flex-start"
                        justifyContent="center"
                    >
                        <Grid item xs={12}>
                            <Grid container>
                                <Grid item xs={12}>
                                    <Hidden only={["xs", "sm"]}>
                                        <Typography align="center" variant="h3">
                                            Nenory Coffee
                                        </Typography>
                                    </Hidden>
                                    <Hidden only={["lg", "md", "xl"]}>
                                        <Typography align="center" variant="h5">
                                            Nenory Coffee
                                        </Typography>
                                    </Hidden>
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid container justifyContent="center">
                                        <AvatarDesign
                                            alt="Coffee Login"
                                            src={AvatarCoffee}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>

                        <GridItemForms item xs={12}>
                            <StepForgetPassword />
                        </GridItemForms>
                    </GridContainerForm>
                </GridForm>
            </GridRoot>
        </GridScreen>
    );
};

export default ForgetPasswordScreen;
