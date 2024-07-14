import React from "react";
import { Grid, styled } from "@mui/material";

import Form from "../../components/Form";
import InputSearch from "../../components/InputSearch";

const FormCustom = styled(Form)(({ theme }) => ({
    maxWidth: 1000,
    width: "100%",
}));

function TobbalUsers(prosp) {
    return (
        <Grid container justifyContent="center">
            <FormCustom onSubmit={console.log}>
                <Grid container justifyContent="flex-end">
                    <InputSearch placeholder="Buscar..." />
                </Grid>
            </FormCustom>
        </Grid>
    );
}

export default TobbalUsers;
