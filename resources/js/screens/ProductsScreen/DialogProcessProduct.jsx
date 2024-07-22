import * as yup from "yup";
import React from "react";

import Grid from "@mui/material/Grid";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";

import { ArrowCircleDown, Close } from "@mui/icons-material";

import Form from "../../components/Form";
import usePutAPI from "../../hooks/usePutAPI";
import InputNumber from "../../components/InputNumber";
import ButtonCommon from "../../components/ButtonCommon";
import { Typography } from "@mui/material";

const schema = yup.object().shape({
    quantity: yup
        .number()
        .required("Es requerido")
        .integer("debe ser un numero entero")
        .positive("debe ser un número positivo")
        .typeError("debe ser un número"),
});

const DialogProcessProductContent = ({
    onSave,
    onClose,
    productId,
    ...props
}) => {
    const { request, loading, status, error } = usePutAPI({
        url: `/products/${productId}/update-stock`,
    });

    const onSubmit = async (values) => {
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
        <Form schema={schema} disabled={loading} onSubmit={onSubmit}>
            <Grid container spacing={2}>
                {status === 400 && error && (
                    <Grid item xs={12}>
                        <Typography variant="body1" color="error">
                            {error.error}
                        </Typography>
                    </Grid>
                )}
                <Grid item xs={12}>
                    <InputNumber
                        name="quantity"
                        label="Cantidad"
                        errors={status === 422 && error && error.errors}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Grid container justifyContent="space-between">
                        <ButtonCommon
                            startIcon={<Close />}
                            size="small"
                            onClick={onClose}
                        >
                            Cancelar
                        </ButtonCommon>
                        <ButtonCommon
                            size="small"
                            type="submit"
                            endIcon={<ArrowCircleDown />}
                        >
                            Procesar
                        </ButtonCommon>
                    </Grid>
                </Grid>
            </Grid>
        </Form>
    );
};

const DialogProcessProduct = ({ open, onClose, ...props }) => (
    <Dialog open={open} onClose={onClose}>
        <DialogTitle>Procesar Producto</DialogTitle>
        <DialogContent>
            {open && (
                <DialogProcessProductContent onClose={onClose} {...props} />
            )}
        </DialogContent>
    </Dialog>
);

export default DialogProcessProduct;
