import * as yup from "yup";
import React from "react";

import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import styled from "@mui/material/styles/styled";
import Typography from "@mui/material/Typography";
import { Link as NodeLink } from "react-router-dom";

import SendIcon from "@mui/icons-material/Send";

import Form from "../../components/Form";
import Input from "../../components/Input";
import usePostAPI from "../../hooks/usePostAPI";
import InputPass from "../../components/InputPass";
import ButtonCommon from "../../components/ButtonCommon";

const FormCustom = styled(Form)(({ theme }) => ({
    width: "100%",
    maxWidth: 370,
    padding: theme.spacing(1),
    [theme.breakpoints.down("sm")]: {
        maxWidth: "auto",
    },
}));

const schema = yup.object().shape({
    username: yup
        .string()
        .min(6, "El usuario debe tener al menos 6 caracteres")
        .required("El campo es requerido"),
    password: yup
        .string()
        .min(8, "La contraseña debe tener al menos 8 caracteres")
        .required("El campo es requerido"),
    email: yup.string().email().required("El campo es requerido"),
    last_name: yup.string().required("El campo es requerido"),
    name: yup.string().required("El campo es requerido"),
    identity_document: yup
        .number()
        .positive("el valor ingresado debe de ser positivo")
        .required("El campo es requerido"),
});

const FormSignup = ({ onSave, ...props }) => {
    const { request, loading, status, error } = usePostAPI({
        url: "/auth/signup",
    });

    const onSubmit = async function (values) {
        const res = await request(values);
        if (!res) {
            return;
        }

        if (onSave) {
            onSave(res);
        }
    };
    return (
        <FormCustom disabled={loading} schema={schema} onSubmit={onSubmit}>
            <Grid container spacing={1} justifyContent="center">
                <Grid item xs={12}>
                    <Typography variant="h5" align="center">
                        Registrar un usuario
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body2">
                        ¿Ya tienes una cuenta?{" "}
                        <Link component={NodeLink} to="/login">
                            Inicia sesión
                        </Link>
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
                        name="last_name"
                        label="Apellido"
                        type="text"
                        errors={status === 422 && error.errors}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Input
                        name="email"
                        label="Correo electronico"
                        errors={status === 422 && error.errors}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Input
                        name="identity_document"
                        label="Cédula de Identidad"
                        type="number"
                        errors={status === 422 && error.errors}
                    />
                </Grid>
                <Grid item xs={12}>
                    <InputPass
                        name="password"
                        label="Contraseña"
                        errors={status === 422 && error.errors}
                    />
                </Grid>
                {status == 401 && error && (
                    <Grid item xs={12}>
                        <Typography variant="body2" color="error">
                            Lo siento hubo un error y no se pudo registrar
                            verifique que todos los campos estan correctos
                        </Typography>
                    </Grid>
                )}{" "}
                {status == 500 && error && (
                    <Grid item xs={12}>
                        <Typography variant="body2" color="error">
                            Ha ocurrido un error inhesperado, por favor contacte
                            al proveedor
                        </Typography>
                    </Grid>
                )}
                <Grid item xs={12}>
                    <ButtonCommon
                        type="submit"
                        fullWidth
                        endIcon={<SendIcon />}
                    >
                        Registrarte
                    </ButtonCommon>
                </Grid>
            </Grid>
        </FormCustom>
    );
};

export default FormSignup;
