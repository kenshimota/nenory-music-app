import React from "react";
import * as yup from "yup";
import Input from "../../components/Input";
import Form from "../../components/Form";
import styled from "@mui/material/styles/styled";
import { Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import ButtonCommon from "../../components/ButtonCommon";
import usePostAPI from "../../hooks/usePostAPI";
import InputPass from "../../components/InputPass";

const FormCustom = styled(Form)(({ theme }) => ({
    width: "100%",
    maxWidth: 300,
    padding: theme.spacing(1),
    [theme.breakpoints.down("sm")]: {
        maxWidth: "auto",
    },
}));

const schema = yup.object().shape({
    username: yup
        .string()
        .min(6, "El usuario debe tener al menos 6 caracteres")
        .required("El nombre de usuario es obligatorio"),
    password: yup
        .string()
        .min(8, "la contraseña debe tener al menos 8 caracteres")
        .required("La contraseña es obligatoria"),
});
function FormCreateUser({ onSave, ...props }) {
    const { request, loading, status, error } = usePostAPI({
        url: "/users",
    });

    const onSubmit = async function (values) {
        const res = await request(values);
        if (!res) {
            return;
        }

        console.log(res);

        if (onSave) {
            onSave(res);
        }
    };
    return (
        <FormCustom disabled={loading} schema={schema} onSubmit={onSubmit}>
            <Grid container spacing={1} justifyContent="Center">
                <Grid item xs={12}>
                    <Typography variant="h5" align="center">
                        Crear Usuario
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Input
                        name="username"
                        label="Usuario"
                        type="text"
                        errors={status === 422 && error.errors}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Input
                        name="name"
                        label="Nombre"
                        type="text"
                        errors={status === 422 && error.errors}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Input
                        name="lastName"
                        label="Apellido"
                        type="text"
                        errors={status === 422 && error.errors}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Input
                        name="email"
                        label="Correo Electronico"
                        type="text"
                        errors={status === 422 && error.errors}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Input
                        name="document identity"
                        label="Cedula de identidad"
                        type="text"
                        errors={status === 422 && error.errors}
                    />
                </Grid>
                <Grid item xs={12}>
                    <InputPass
                        name="password"
                        label="Contraseña"
                        type="text"
                        errors={status === 422 && error.errors}
                    />
                </Grid>
                <Grid item xs={12}>
                    <ButtonCommon type="submit" fullWidth loading={loading}>
                        Crear
                    </ButtonCommon>
                </Grid>
            </Grid>
        </FormCustom>
    );
}

export default FormCreateUser;
