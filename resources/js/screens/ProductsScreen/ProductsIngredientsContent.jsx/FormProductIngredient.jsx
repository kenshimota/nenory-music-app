import * as yup from "yup";
import React from "react";

import Grid from "@mui/material/Grid";

import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";

import Form from "../../../components/Form";
import { useForm } from "../../../components/Form";
import InputNumber from "../../../components/InputNumber";
import ButtonCommon from "../../../components/ButtonCommon";
import SelectMeasure from "../../../components/SelectMeasure";
import AutocompleteIngredients from "../../../components/AutocompleteIngredients";

const schema = yup.object().shape({
    ingredient: yup
        .object()
        .required("Es requerido")
        .typeError("debe seleccionar un ingrediente"),
    quantity: yup
        .number()
        .required("Es requerido")
        .positive("debe ser un numero positivo")
        .typeError("Debe ser un número"),
    measure_id: yup
        .number()
        .required("Es requerido")
        .typeError("Debe seleccionar una medida"),
});

const SelectMeasureCustom = (props) => {
    const { values } = useForm();
    const { ingredient } = values;

    return (
        <SelectMeasure
            {...props}
            measure_type_id={ingredient?.measure_type_id}
        />
    );
};

const FormProductIngredient = ({
    onSubmit: submit,
    disabled,
    onClose,
    errors,
    ...props
}) => {
    const onSubmit = ({ ingredient, ...values }) => {
        if (submit) {
            submit({
                ...values,
                ingredient_id: (ingredient && ingredient.id) || null,
            });
        }
    };

    return (
        <Form {...props} schema={schema} onSubmit={onSubmit}>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <AutocompleteIngredients
                        label="Producto"
                        name="ingredient"
                        errors={errors}
                    />
                </Grid>
                <Grid item xs={12}>
                    <SelectMeasureCustom
                        label="Medida"
                        name="measure_id"
                        errors={errors}
                    />
                </Grid>
                <Grid item xs={12}>
                    <InputNumber
                        label="Cantidad"
                        name="quantity"
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
};

export default FormProductIngredient;
