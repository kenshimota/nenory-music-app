import React, { useState } from "react";
import { Grid } from "@mui/material";
import styled from "@mui/material/styles/styled";

import TableUsers from "./TableUsers";
import TobbalUsers from "./TobbalUsers";
import useAutoGetAPI from "../../hooks/useAutoGetAPI";
import Loading from "../../components/Loading";
import ButtonCreate from "./ButtonCreate";

const GridRoot = styled(Grid)(({ theme }) => ({
    width: "100%",
    height: "100%",
    position: "relative",
    margin: theme.spacing(0),
}));

const GridContent = styled(Grid)(() => ({
    height: "calc(100% - 120px)",
    width: "100%",
    position: "relative",
}));

const GridContent2 = styled(Grid)(({ theme }) => ({
    padding: theme.spacing(1),
}));
function ShowListUsers() {
    const [page, setPage] = useState(1);
    const { response, loading, reload } = useAutoGetAPI({
        url: "/users",
        query: { page },
    });

    return (
        <GridRoot container>
            <Grid item xs={12}>
                <TobbalUsers />
            </Grid>
            <GridContent item xs={12}>
                {loading && <Loading />}
                {!loading && response && (
                    <TableUsers currentItems={response.data} onSave={reload} />
                )}
            </GridContent>
            <GridContent2 item xs={12}>
                <Grid container justifyContent="center">
                    <ButtonCreate />
                </Grid>
            </GridContent2>
        </GridRoot>
    );
}

export default ShowListUsers;
