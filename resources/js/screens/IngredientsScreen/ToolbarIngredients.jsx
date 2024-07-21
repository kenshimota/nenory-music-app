import React from "react";
import { Grid, styled } from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";

import Form from "../../components/Form";
import Input from "../../components/Input";
import SelectMeasure from "../../components/SelectMeasure";
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

const ToolbarIngredients = (props) => (
    <Form {...props}>
        <Grid container spacing={1} justifyContent="flex-end">
            <GridFields item>
                <Grid container spacing={1} justifyContent="flex-end">
                    <Grid item xs={12} md={6}>
                        <Input
                            label="Buscar por"
                            name="search"
                            placeholder="Buscar..."
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <SelectMeasure name="measure_id" label="Medida" />
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

export default ToolbarIngredients;
