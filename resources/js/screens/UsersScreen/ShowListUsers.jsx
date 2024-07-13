import React, { useState } from "react";
import { Grid } from "@mui/material";

import TobbalUsers from "./TobbalUsers";
import useAutoGetAPI from "../../hooks/useAutoGetAPI";
import ContainerWhite from "../../components/ContainerWhite";

function ShowListUsers() {
    const [page, setPage] = useState(1);
    const state = useAutoGetAPI({ url: "/users", query: { page } });

    return (
        <Grid container spacing={1}>
            <TobbalUsers />
            <ContainerWhite />
            <p>hola jessy</p>
        </Grid>
    );
}

export default ShowListUsers;
