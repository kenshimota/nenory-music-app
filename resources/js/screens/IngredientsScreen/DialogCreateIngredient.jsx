import React from "react";

import Dialog from "@mui/material/Dialog";
import FormIngredient from "./FormIngredient";
import usePostAPI from "../../hooks/usePostAPI";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";

const DialogCreateIngredientContent = ({ onSave, onClose, ...props }) => {
    const { request, loading, error, status } = usePostAPI({
        url: "/ingredients",
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
        <FormIngredient
            onSubmit={onSubmit}
            disabled={loading}
            onClose={onClose}
            errors={status === 422 && error && error.errors}
        />
    );
};

const DialogCreateIngredient = ({ open, onClose, ...props }) => (
    <Dialog open={open} maxWidth="xs" fullWidth onClose={onClose}>
        <DialogTitle>Nuevo Ingrediente</DialogTitle>
        <DialogContent>
            <DialogCreateIngredientContent onClose={onClose} {...props} />
        </DialogContent>
    </Dialog>
);

export default DialogCreateIngredient;
