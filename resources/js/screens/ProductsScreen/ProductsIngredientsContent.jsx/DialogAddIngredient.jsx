import React from "react";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import FormProductIngredient from "./FormProductIngredient";
import usePostAPI from "../../../hooks/usePostAPI";

const DialogAddIngredientContent = ({
    productId,
    onSave,
    onClose,
    ...props
}) => {
    const { request, loading, status, error } = usePostAPI({
        url: "/product_ingredients",
    });

    const onSubmit = async (values) => {
        const res = await request({ product_id: productId, ...values });

        if (!res) {
            return;
        }

        onClose();

        if (onSave) {
            onSave(res);
        }
    };

    return (
        <FormProductIngredient
            onClose={onClose}
            disabled={loading}
            onSubmit={onSubmit}
            errors={status === 422 && error && error.errors}
        />
    );
};

const DialogAddIngredient = ({ open, onClose, ...props }) => (
    <Dialog maxWidth="xs" open={open} onClose={onClose}>
        <DialogTitle>Agregar Ingrediente</DialogTitle>
        <DialogContent>
            {open && (
                <DialogAddIngredientContent {...props} onClose={onClose} />
            )}
        </DialogContent>
    </Dialog>
);

export default DialogAddIngredient;
