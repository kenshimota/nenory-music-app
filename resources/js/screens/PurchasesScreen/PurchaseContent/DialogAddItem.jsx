import * as yup from "yup";
import React from "react";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";

import FormPurchaseItem from "./FormPurchaseItem";
import usePostAPI from "../../../hooks/usePostAPI";

const schema = yup.object().shape({
    ingredient: yup
        .object()
        .required("El producto es requerido")
        .typeError("el producto es requerido"),
    quantity: yup
        .number()
        .positive("debe ser un monto positivo")
        .required("La cantidad es requerida")
        .typeError("el valor debe ser numerico"),
    measure_id: yup.number().required("La unidad es requerida"),
    cost: yup
        .number()
        .required("El costo es requerido")
        .positive("debe ser un monto positivo")
        .typeError("el valor debe ser numerico"),
});

const DialogAddItemContent = ({ purchaseId, onSave, onClose, ...props }) => {
    const { request, loading, error, status } = usePostAPI({
        url: "/purchase_items",
    });

    const onSubmit = async (values) => {
        const res = await request({ ...values, purchase_id: purchaseId });
        if (!res) {
            return;
        }

        onClose();

        if (onSave) {
            onSave(res);
        }
    };

    return (
        <FormPurchaseItem
            schema={schema}
            onSubmit={onSubmit}
            disabled={loading}
            onClose={onClose}
            errors={status === 422 && error && error.errors}
        />
    );
};

const DialogAddItem = ({ open, onClose, ...props }) => (
    <Dialog open={open} maxWidth="xs" fullWidth onClose={onClose}>
        <DialogTitle>Agregar Producto</DialogTitle>
        <DialogContent>
            <DialogAddItemContent onClose={onClose} {...props} />
        </DialogContent>
    </Dialog>
);

export default DialogAddItem;
