import React from "react";
import * as yup from "yup";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import FormUser from "./FormUser";
import usePostAPI from "../../hooks/usePostAPI";

const schema = yup.object().shape({
    username: yup
        .string()
        .min(6, "El usuario debe tener al menos 6 caracteres")
        .required("El campo es requerido"),
    password: yup
        .string()
        .min(8, "La contraseña debe tener al menos 8 caracteres")
        .required("El campo es requerido"),
    email: yup
        .string()
        .email("Este email es invalido")
        .required("El campo es requerido"),
    last_name: yup.string().required("El campo es requerido"),
    name: yup.string().required("El campo es requerido"),
    identity_document: yup
        .number()
        .positive("el valor ingresado debe de ser positivo")
        .required("El campo es requerido"),
});

function FormCreateUser({ onSave, onClose, ...props }) {
    const { request, loading, status, error } = usePostAPI({
        url: "/users",
    });

    const onSubmit = async function (values) {
        const res = await request(values);
        if (!res) {
            return;
        }

        onClose();

        if (onSave) {
            onSave(res);
        }
    };
    return (
        <Grid container>
            {status === 500 && (
                <Grid item xs={12}>
                    <Typography variant="body1" color="error">
                        Ha ocurrido un error inhesperado, por favor contacte al
                        proveedor
                    </Typography>
                </Grid>
            )}
            <Grid item xs={12}>
                <FormUser
                    schema={schema}
                    onClose={onClose}
                    onSubmit={onSubmit}
                    disabled={loading}
                    errors={status === 422 && error && error.errors}
                />
            </Grid>
        </Grid>
    );
}

export default FormCreateUser;
