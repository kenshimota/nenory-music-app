import * as yup from "yup";
import React from "react";
import Grid from "@mui/material/Grid";

import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";

import Form from "../../components/Form";
import Input from "../../components/Input";
import ButtonCommon from "../../components/ButtonCommon";
import SelectMeasure from "../../components/SelectMeasure";

const schema = yup.object().shape({
    measure_id: yup.number().required("Es requerida").typeError("Es requerida"),
    name: yup
        .string()
        .min(4, "La cantidad de caracteres es 4")
        .max(255, "la cantidad de caracteres maximo son 255")
        .required("Es requerido")
        .typeError("El valor es invalido"),
});

const FormIngredient = ({ onClose, disabled, errors, ...props }) => (
    <Form schema={schema} disabled={disabled} {...props}>
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Input label="Nombre" name="name" errors={errors} />
            </Grid>
            <Grid item xs={12}>
                <SelectMeasure
                    label="Medida"
                    name="measure_id"
                    errors={errors}
                />
            </Grid>
            <Grid item xs={12}>
                <Grid container justifyContent="space-between">
                    <ButtonCommon
                        disabled={disabled}
                        onClick={onClose}
                        size="small"
                        startIcon={<CloseIcon />}
                    >
                        Cerrar
                    </ButtonCommon>
                    <ButtonCommon
                        disabled={disabled}
                        type="submit"
                        size="small"
                        endIcon={<SaveIcon />}
                    >
                        Guardar
                    </ButtonCommon>
                </Grid>
            </Grid>
        </Grid>
    </Form>
);

export default FormIngredient;
