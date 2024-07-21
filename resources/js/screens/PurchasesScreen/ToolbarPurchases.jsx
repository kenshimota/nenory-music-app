import React from "react";
import { Grid, styled } from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";

import Form from "../../components/Form";
import Input from "../../components/Input";
import ButtonReponsible from "../../components/ButtonReponsible";
import DatePickerForm from "../../components/DatePickerForm";
import Format from "../../components/Format";
import AutocompleteUsers from "../../components/AutocompleteUsers";
import AutocompleteSuppliers from "../../components/AutocompleteSuppliers";

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

const GridItemField = styled(Grid)(({ theme }) => ({
    width: 220,
    [theme.breakpoints.down("sm")]: {
        width: "100%",
    },
}));

const InputCustom = styled(Input)(({ theme }) => ({
    [theme.breakpoints.up("md")]: {
        position: "relative",
        top: theme.spacing(1.5),
    },
}));

const AutocompleteUsersCustom = styled(AutocompleteUsers)(({ theme }) => ({
    [theme.breakpoints.up("md")]: {
        position: "relative",
        top: theme.spacing(1.5),
    },
}));

const AutocompleteSuppliersCustom = styled(AutocompleteSuppliers)(
    ({ theme }) => ({
        [theme.breakpoints.up("md")]: {
            position: "relative",
            top: theme.spacing(1.5),
        },
    })
);

/**
 *
 * @param {Date} date
 * @returns
 */
const dateToString = (date) =>
    `${date.getFullYear()}-${Format.FillZero({
        value: date.getMonth() + 1,
        amount: 2,
    })}-${Format.FillZero({ value: date.getDate(), amount: 2 })}`;

const ToolbarPurchases = ({ onSubmit: submit, ...props }) => {
    const onSubmit = ({ from, to, user, supplier, ...values }) => {
        if (submit) {
            submit({
                ...values,
                from: (from && dateToString(from)) || null,
                to: (to && dateToString(to)) || null,
                user_id: (user && user.id) || null,
                supplier_id: (supplier && supplier.id) || null,
            });
        }
    };

    return (
        <Form onSubmit={onSubmit} {...props}>
            <Grid container spacing={1} justifyContent="flex-end">
                <GridFields item>
                    <Grid container spacing={1} justifyContent="flex-end">
                        <GridItemField item>
                            <InputCustom
                                label="Buscar por"
                                name="search"
                                placeholder="Buscar..."
                            />
                        </GridItemField>
                        <GridItemField item>
                            <AutocompleteSuppliersCustom
                                label="Proveedor"
                                name="supplier"
                            />
                        </GridItemField>
                        <GridItemField item>
                            <AutocompleteUsersCustom
                                label="Creado por"
                                name="user"
                            />
                        </GridItemField>
                        <GridItemField item>
                            <DatePickerForm label="Desde" name="from" />
                        </GridItemField>
                        <GridItemField item>
                            <DatePickerForm label="Hasta" name="to" />
                        </GridItemField>
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

export default ToolbarPurchases;
