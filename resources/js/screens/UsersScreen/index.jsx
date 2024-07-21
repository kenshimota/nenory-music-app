import React, { useState } from "react";
import { Grid, styled } from "@mui/material";

import TableUsers from "./TableUsers";
import ToolbarUsers from "./ToolbarUsers";
import ButtonCreate from "./ButtonCreate";
import Loading from "../../components/Loading";
import useAutoGetAPI from "../../hooks/useAutoGetAPI";
import MainPage from "../../components/MainPage";
import FooterPagination from "../../components/FooterPagination";

const GridRoot = styled(Grid)(({ theme }) => ({
    width: "100%",
    height: "100%",
    position: "relative",
    margin: theme.spacing(0),
}));

const GridContent = styled(Grid)(() => ({
    height: "calc(100% - 120px)",
    width: "100%",
    overflow: "hidden",
    position: "relative",
}));

const GridContent2 = styled(Grid)(({ theme }) => ({
    padding: theme.spacing(1),
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
        padding: theme.spacing(1),
    },
}));

const Toolbar = styled(ToolbarUsers)(({ theme }) => ({
    width: "100%",
    maxWidth: 600,
}));

const UsersScreen = (props) => {
    const [page, setPage] = useState(1);
    const [filters, setFilters] = useState({});
    const { response, loading, reload } = useAutoGetAPI({
        url: "/users",
        query: { page, ...filters },
    });

    return (
        <MainPage title="Nenory Coffee" subtitle="Usuarios" isBack>
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
                        <TableUsers
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
                <GridContent2 item xs={12}>
                    <FooterPagination
                        isBack={response && response.current_page !== 1}
                        isNext={
                            response &&
                            response.current_page !== response.last_page
                        }
                        onBack={() => setPage(page - 1)}
                        onNext={() => setPage(page + 1)}
                    >
                        <ButtonCreate onSave={reload} />
                    </FooterPagination>
                </GridContent2>
            </GridRoot>
        </MainPage>
    );
};

export default UsersScreen;
