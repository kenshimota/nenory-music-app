import React from "react";
import { Grid, styled } from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";

import Form from "../../components/Form";
import Input from "../../components/Input";
import ButtonReponsible from "../../components/ButtonReponsible";

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

const ToolbarProducts = ({ onSubmit: submit, ...props }) => {
    const onSubmit = ({ city, ...values }) => {
        if (submit) {
            submit({ ...values, city_id: (city && city.id) || null });
        }
    };

    return (
        <Form onSubmit={onSubmit} {...props}>
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
                    </Grid>
                </GridFields>
                <GridButton item>
                    <ButtonReponsible
                        fullWidth
                        type="submit"
                        icon={<SearchIcon />}
                    >
                        Buscar
                    </ButtonReponsible>
                </GridButton>
            </Grid>
        </Form>
    );
};

export default ToolbarProducts;
