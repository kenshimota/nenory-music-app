import React, { useState } from "react";
import { Grid } from "@mui/material";
import styled from "@mui/material/styles/styled";

import TableUsers from "./TableUsers";
import TobbalUsers from "./TobbalUsers";
import useAutoGetAPI from "../../hooks/useAutoGetAPI";
import Loading from "../../components/Loading";

const GridRoot = styled(Grid)(({ theme }) => ({
    width: "100%",
    height: "100%",
    position: "relative",
    margin: theme.spacing(0),
}));

const GridContent = styled(Grid)(() => ({
    height: "calc(100% - 70px)",
    width: "100%",
    position: "relative",
}));

function ShowListUsers() {
    const [page, setPage] = useState(1);
    const { response, loading } = useAutoGetAPI({
        url: "/users",
        query: { page },
    });

    console.log({ response, loading });

    return (
        <GridRoot container>
            <Grid item xs={12}>
                <TobbalUsers />
            </Grid>
            <GridContent item xs={12}>
                {loading && <Loading />}
                {!loading && response && (
                    <TableUsers currentItems={response.data} />
                )}
            </GridContent>
        </GridRoot>
    );
}

/*
 */
//   <ContainerWhite>  </ContainerWhite>
export default ShowListUsers;
