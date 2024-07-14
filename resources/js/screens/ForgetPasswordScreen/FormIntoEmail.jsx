import * as yup from "yup";
import React from "react";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import styled from "@mui/material/styles/styled";

import EmailIcon from "@mui/icons-material/Email";
import SendIcon from "@mui/icons-material/Send";

import Form from "../../components/Form";
import Input from "../../components/Input";
import usePostAPI from "../../hooks/usePostAPI";
import ButtonCommon from "../../components/ButtonCommon";

const schema = yup.object().shape({
    email: yup
        .string()
        .email("El correo electrónico no es válido")
        .required("El correo electrónico es obligatorio"),
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

const FormIntoEmail = ({ onSave, ...props }) => {
    const { request, loading, error, status } = usePostAPI({
        url: "/auth/forgot-password",
    });

    const onSubmit = async function (values) {
        const res = await request(values);
        if (!res) {
            return;
        }

        if (onSave) {
            onSave(values);
        }
    };

    return (
        <Form disabled={loading} schema={schema} onSubmit={onSubmit} {...props}>
            <GridContainer container spacing={2}>
                <GridText item xs={12}>
                    <Grid container justifyContent="center">
                        <EmailIcon fontSize="large" color="primary" />
                    </Grid>
                    <Typography variant="h5" align="center">
                        Ingresar Correo Electronico
                    </Typography>
                    <Typography variant="body2">
                        Este paso sera para logra identificar tu cuenta y asi
                        poder contactarte con el codigo de verificacion del
                        siguiente paso
                    </Typography>
                </GridText>

                <Grid item xs={12}>
                    <Input
                        name="email"
                        placeholder="myemail@example.com"
                        label="Correo electronico"
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
                    <Grid container justifyContent="flex-end">
                        <ButtonCommon type="submit" endIcon={<SendIcon />}>
                            Continuar
                        </ButtonCommon>
                    </Grid>
                </Grid>
            </GridContainer>
        </Form>
    );
};

export default FormIntoEmail;
