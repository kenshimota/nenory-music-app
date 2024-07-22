import React from "react";
import Grid from "@mui/material/Grid";

import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";

import Form, { useForm } from "../../../components/Form";
import InputNumber from "../../../components/InputNumber";
import ButtonCommon from "../../../components/ButtonCommon";
import SelectMeasure from "../../../components/SelectMeasure";
import AutocompleteIngredients from "../../../components/AutocompleteIngredients";

const SelectMeasureCustom = (props) => {
    const { values } = useForm();
    const { ingredient } = values;

    console.log(ingredient);

    return (
        <SelectMeasure
            {...props}
            measure_type_id={ingredient?.measure_type_id}
        />
    );
};

const FormPurchaseItem = ({ onSubmit: submit, onClose, errors, ...props }) => {
    const onSubmit = ({ ingredient, ...values }) => {
        if (submit) {
            submit({
                ...values,
                ingredient_id: (ingredient && ingredient.id) || null,
            });
        }
    };

    return (
        <Form onSubmit={onSubmit} {...props}>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <AutocompleteIngredients
                        label="Producto"
                        name="ingredient"
                    />
                </Grid>
                <Grid item xs={12}>
                    <InputNumber label="Costo" errors={errors} name="cost" />
                </Grid>
                <Grid item xs={12}>
                    <SelectMeasureCustom
                        label="Medida"
                        errors={errors}
                        name="measure_id"
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
                            size="small"
                            errors={errors}
                            onClick={onClose}
                            startIcon={<CloseIcon />}
                        >
                            Cancelar
                        </ButtonCommon>
                        <ButtonCommon
                            size="small"
                            type="submit"
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

export default FormPurchaseItem;
