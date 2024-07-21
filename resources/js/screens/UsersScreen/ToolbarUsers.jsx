import React from "react";
import { Grid, styled } from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";

import Form from "../../components/Form";
import SelectRole from "../../components/SelectRole";
import InputSearch from "../../components/InputSearch";
import ButtonReponsible from "../../components/ButtonReponsible";
import Input from "../../components/Input";

const GridFields = styled(Grid)(({ theme }) => ({
    width: "100%",
    maxWidth: "calc(100% - 60px)",
    [theme.breakpoints.down("sm")]: {
        maxWidth: "100%",
    },
}));

const GridButton = styled(Grid)(({ theme }) => ({
    top: theme.spacing(1),
    position: "relative",
    [theme.breakpoints.down("sm")]: {
        width: "100%",
        top: theme.spacing(0),
    },
}));

const ToolbarUsers = (props) => (
    <Form {...props}>
        <Grid container spacing={1} justifyContent="flex-end">
            <GridFields item>
                <Grid container spacing={1} justifyContent="flex-end">
                    <Grid item xs={12} md={6}>
                        <Input
                            label="Nombre"
                            name="search"
                            placeholder="Buscar..."
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <SelectRole name="role_id" label="Tipo de Usuario" />
                    </Grid>
                </Grid>
            </GridFields>
            <GridButton item>
                <ButtonReponsible fullWidth type="submit" icon={<SearchIcon />}>
                    Buscar
                </ButtonReponsible>
            </GridButton>
        </Grid>
    </Form>
);

export default ToolbarUsers;
