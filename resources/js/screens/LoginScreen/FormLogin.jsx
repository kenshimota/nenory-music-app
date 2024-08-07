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

const FormLogin = ({ onSave, ...props }) => {
    const { request, loading, status, error } = usePostAPI({
        url: "/auth/signin",
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
            <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12}>
                    <Typography variant="h5" align="center">
                        Inicia Sesión
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body2">
                        ¿No tienes una cuenta?{" "}
                        <Link component={NodeLink} to="/signup">
                            Regístrate ahora
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
                    <InputPass
                        name="password"
                        label="Contraseña"
                        errors={status === 422 && error.errors}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Grid container justifyContent="flex-end">
                        <Link component={NodeLink} to="/forget-password">
                            ¿Haz olvidado tu contraseña?
                        </Link>
                    </Grid>
                </Grid>
                {status == 401 && (
                    <Grid item xs={12}>
                        <Typography variant="body2" color="error">
                            Lo siento no puede iniciar sesión, El usuario o la
                            contraseña son incorrectos
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
                        loading={loading}
                        endIcon={<SendIcon />}
                    >
                        Entrar
                    </ButtonCommon>
                </Grid>
            </Grid>
        </FormCustom>
    );
};

export default FormLogin;
