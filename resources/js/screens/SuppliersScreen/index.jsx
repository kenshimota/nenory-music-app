import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import styled from "@mui/material/styles/styled";

import Loading from "../../components/Loading";
import MainPage from "../../components/MainPage";
import useAutoGetAPI from "../../hooks/useAutoGetAPI";
import TableSuppliers from "./TableSuppliers";
import ButtonCreateSupplier from "./ButtonCreateSupplier";

const GridRoot = styled(Grid)(({ theme }) => ({
    width: "100%",
    height: "100%",
    position: "relative",
    margin: theme.spacing(0),
}));

const GridContent = styled(Grid)(({ theme }) => ({
    height: "calc(100% - 120px)",
    width: "100%",
    position: "relative",
    [theme.breakpoints.down("sm")]: {
        height: "calc(100% - 100px)",
    },
}));

const SuppliersScreen = () => {
    const [page, setPage] = useState(1);
    const { response, loading, reload } = useAutoGetAPI({
        url: "/suppliers",
        query: { page },
    });

    return (
        <MainPage title="Nenory Coffee" subtitle="Proveedores" isBack>
            <GridRoot container>
                <Grid item xs={12}></Grid>
                <GridContent item xs={12}>
                    {loading && <Loading />}
                    {!loading && response && (
                        <TableSuppliers
                            currentItems={response.data}
                            onSave={reload}
                        />
                    )}
                </GridContent>
                <Grid item xs={12}>
                    <Grid container justifyContent="center">
                        <ButtonCreateSupplier
                            color="primary"
                            variant="contained"
                            onSave={reload}
                        />
                    </Grid>
                </Grid>
            </GridRoot>
        </MainPage>
    );
};

export default SuppliersScreen;
