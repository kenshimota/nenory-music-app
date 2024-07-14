import * as yup from "yup";
import React from "react";
import PropTypes from "prop-types";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import styled from "@mui/material/styles/styled";

import CodeIcon from "@mui/icons-material/Code";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import Form from "../../components/Form";
import Input from "../../components/Input";
import usePostAPI from "../../hooks/usePostAPI";
import ButtonCommon from "../../components/ButtonCommon";

const schema = yup.object().shape({
    code: yup
        .number()
        .min(100000, "El valor ingresado es menor a 100000")
        .max(999999, "El valor maximo es de 999999")
        .required("El codigo es requerido"),
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

const FormIntoCode = ({ onSave, onClose, email, ...props }) => {
    const { request, loading, status, error } = usePostAPI({
        url: "/auth/verify-code-password",
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
                        <CodeIcon fontSize="large" color="primary" />
                    </Grid>
                    <Typography variant="h5" align="center">
                        Ingresar el codigo de verificación
                    </Typography>
                    <Typography variant="body2">
                        Hemos enviado un correo electronico a la direccion{" "}
                        <b>{email}</b> con un codigo numerico de 6 digitos,
                        Chequea tu bandera de entrada.
                    </Typography>
                </GridText>

                <Grid item xs={12}>
                    <Input
                        name="code"
                        placeholder="000000"
                        label="Codigo de Verificación"
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
                            Continuar
                        </ButtonCommon>
                    </Grid>
                </Grid>
            </GridContainer>
        </Form>
    );
};

FormIntoCode.propTypes = {
    onSave: PropTypes.func,
    onClose: PropTypes.func,
    email: PropTypes.string,
};

export default FormIntoCode;
