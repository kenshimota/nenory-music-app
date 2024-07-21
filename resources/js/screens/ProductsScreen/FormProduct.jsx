import * as yup from "yup";
import React from "react";
import Grid from "@mui/material/Grid";

import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";

import Form from "../../components/Form";
import Input from "../../components/Input";
import ButtonCommon from "../../components/ButtonCommon";

const schema = yup.object().shape({
    code: yup
        .string()
        .required("Es requerido")
        .trim()
        .min(5, "El codigo debe tener al menos 5 caracteres")
        .typeError("El valor es invalido"),
    name: yup
        .string()
        .min(4, "La cantidad de caracteres es 4")
        .max(255, "la cantidad de caracteres maximo son 255")
        .required("Es requerido")
        .typeError("El valor es invalido"),
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
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Input label="Nombre" name="name" errors={errors} />
                </Grid>
                <Grid item xs={12}>
                    <Input label="Código" name="code" errors={errors} />
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
