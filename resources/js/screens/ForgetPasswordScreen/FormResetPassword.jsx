import * as yup from "yup";
import React from "react";
import PropTypes from "prop-types";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import styled from "@mui/material/styles/styled";

import LockOpenIcon from "@mui/icons-material/LockOpen";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import Form from "../../components/Form";
import usePostAPI from "../../hooks/usePostAPI";
import InputPass from "../../components/InputPass";
import ButtonCommon from "../../components/ButtonCommon";

const schema = yup.object().shape({
    password: yup
        .string()
        .min(8, "la contraseña debe tener al menos 8 caracteres")
        .required("Es requerido"),
    confirm_password: yup
        .string()
        .min(8, "la contraseña debe tener al menos 8 caracteres")
        .oneOf([yup.ref("password"), null], "las contraseñas no coinciden"),
});

const GridContainer = styled(Grid)(({ theme }) => ({
    marginTop: theme.spacing(3),
    [theme.breakpoints.up("md")]: {
        marginTop: theme.spacing(0),
        padding: theme.spacing(3),
    },
}));

const GridText = styled(Grid)(({ theme }) => ({
    width: "100%",
    maxWidth: 300,
}));

const FormResetPassword = ({ onSave, onClose, email, ...props }) => {
    const { request, loading, status, error } = usePostAPI({
        url: "/auth/reset-password",
    });

    const onSubmit = async function (values) {
        const res = await request({ ...values, email });
        if (!res) {
            return;
        }

        if (onSave) {
            onSave(res);
        }
    };

    return (
        <Form disabled={loading} schema={schema} onSubmit={onSubmit} {...props}>
            <GridContainer container spacing={2}>
                <GridText item xs={12}>
                    <Grid container justifyContent="center">
                        <LockOpenIcon fontSize="large" color="primary" />
                    </Grid>
                    <Typography variant="h5" align="center">
                        Cambia tu contraseña
                    </Typography>
                    <Typography variant="body2">
                        Ya hemos podido identificarte, ahora puedes cambiar tu
                        contraseña
                    </Typography>
                </GridText>

                <Grid item xs={12}>
                    <InputPass
                        name="password"
                        label="Contraseña"
                        errors={status === 422 && error.errors}
                    />
                </Grid>

                <Grid item xs={12}>
                    <InputPass
                        name="confirm_password"
                        label="Confirmar Contraseña"
                        errors={status === 422 && error.errors}
                    />
                </Grid>

                {status === 500 && (
                    <Grid container justifyContent="center">
                        <Typography variant="body2" color="error">
                            Error en la verificacion del codigo. Contacte a su
                            proveedor
                        </Typography>
                    </Grid>
                )}

                <Grid item xs={12}>
                    <Grid container justifyContent="space-between">
                        <ButtonCommon
                            onClick={onClose}
                            startIcon={<ArrowBackIcon />}
                        >
                            Atras
                        </ButtonCommon>
                        <ButtonCommon
                            type="submit"
                            endIcon={<ArrowForwardIcon />}
                        >
                            Guardar
                        </ButtonCommon>
                    </Grid>
                </Grid>
            </GridContainer>
        </Form>
    );
};

FormResetPassword.propTypes = {
    onSave: PropTypes.func,
    onClose: PropTypes.func,
    email: PropTypes.string,
};

export default FormResetPassword;
