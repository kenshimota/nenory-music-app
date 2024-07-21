import * as yup from "yup";
import React from "react";
import Grid from "@mui/material/Grid";
import styled from "@mui/material/styles/styled";

import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";

import Form from "../../components/Form";
import Input from "../../components/Input";
import ButtonCommon from "../../components/ButtonCommon";
import AutocompleteCities from "../../components/AutocompleteCities";

const schema = yup.object().shape({
    city: yup
        .object()
        .required("Es requerido")
        .typeError("debe seleccionar una ciudad"),
    name: yup.string().required("El nombre es obligatorio"),
    email: yup
        .string()
        .email("El correo electrónico no es válido")
        .required("El correo electrónico es obligatorio"),
    address: yup.string(),
    code_postal: yup
        .number()
        .nullable()
        .integer("Debe ser un numero entero")
        .typeError("debe ser numerico"),
    identity_document: yup
        .number()
        .positive("el valor ingresado debe de ser positivo")
        .required("El campo es requerido")
        .typeError("el valor ingresado es invalido"),
});

const FormSupplier = ({
    onClose,
    disabled,
    errors,
    onSubmit: submit,
    ...props
}) => {
    const onSubmit = (values) => {
        const { city, ...other } = values;

        if (submit) {
            submit({ ...other, city_id: city && city.id });
        }
    };

    return (
        <Form
            schema={schema}
            onSubmit={onSubmit}
            disabled={disabled}
            {...props}
        >
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Input label="Nombre" name="name" errors={errors} />
                </Grid>
                <Grid item xs={12}>
                    <Input
                        label="Correo electrónico"
                        name="email"
                        errors={errors}
                        type="email"
                    />
                </Grid>
                <Grid item xs={12}>
                    <Input
                        type="number"
                        label="Documento de Identidad"
                        name="identity_document"
                        errors={errors}
                    />
                </Grid>
                <Grid item xs={12}>
                    <AutocompleteCities name="city" label="Ciudad" />
                </Grid>
                <Grid item xs={12}>
                    <Input
                        label="Codigo Postal"
                        type="number"
                        name="code_postal"
                        errors={errors}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Input label="Dirección" name="address" errors={errors} />
                </Grid>
                <Grid item xs={12}>
                    <Grid container justifyContent="space-between">
                        <ButtonCommon
                            disabled={disabled}
                            type="submit"
                            size="small"
                            endIcon={<SaveIcon />}
                        >
                            Guardar
                        </ButtonCommon>
                        <ButtonCommon
                            disabled={disabled}
                            onClick={onClose}
                            size="small"
                            startIcon={<CloseIcon />}
                        >
                            Cerrar
                        </ButtonCommon>
                    </Grid>
                </Grid>
            </Grid>
        </Form>
    );
};

export default FormSupplier;
