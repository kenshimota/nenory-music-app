import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import styled from "@mui/material/styles/styled";

import Loading from "../../components/Loading";
import MainPage from "../../components/MainPage";
import useAutoGetAPI from "../../hooks/useAutoGetAPI";
import TableSuppliers from "./TableSuppliers";
import ButtonCreateSupplier from "./ButtonCreateSupplier";
import ToolbarSuppliers from "./ToolbarSuppliers";

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

const GridToolbarItem = styled(Grid)(({ theme }) => ({
    width: "100%",

    maxWidth: 1200,
    [theme.breakpoints.down("sm")]: {
        maxWidth: "100%",
    },
}));

const GridToolbar = styled(Grid)(({ theme }) => ({
    [theme.breakpoints.down("sm")]: {
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
}));

const Toolbar = styled(ToolbarSuppliers)(({ theme }) => ({
    width: "100%",
    maxWidth: 600,
}));

const SuppliersScreen = () => {
    const [page, setPage] = useState(1);
    const [filters, setFilters] = useState({});
    const { response, loading, reload } = useAutoGetAPI({
        url: "/suppliers",
        query: { page, ...filters },
    });

    return (
        <MainPage title="Nenory Coffee" subtitle="Proveedores" isBack>
            <GridRoot container>
                <GridToolbar item xs={12}>
                    <Grid container justifyContent="center">
                        <GridToolbarItem item>
                            <Grid container justifyContent="flex-end">
                                <Toolbar
                                    onSubmit={(newValues) =>
                                        setFilters(newValues)
                                    }
                                />
                            </Grid>
                        </GridToolbarItem>
                    </Grid>
                </GridToolbar>
                <GridContent item xs={12}>
                    {loading && <Loading />}
                    {!loading && response && (
                        <TableSuppliers
                            currentItems={response.data}
                            onSave={reload}
                            isBack={response.current_page !== 1}
                            isNext={
                                response.current_page !== response.last_page
                            }
                            onBack={() => setPage(page - 1)}
                            onNext={() => setPage(page + 1)}
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
