import React from "react";

import Dialog from "@mui/material/Dialog";
import FormProduct from "./FormProduct";
import usePostAPI from "../../hooks/usePostAPI";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";

const DialogCreateSupplierContent = ({ onSave, onClose, ...props }) => {
    const { request, loading, error, status } = usePostAPI({
        url: "/products",
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
        <FormProduct
            onSubmit={onSubmit}
            disabled={loading}
            onClose={onClose}
            errors={status === 422 && error && error.errors}
        />
    );
};

const DialogCreateSupplier = ({ open, onClose, ...props }) => (
    <Dialog open={open} maxWidth="xs" fullWidth onClose={onClose}>
        <DialogTitle>Nuevo Producto</DialogTitle>
        <DialogContent>
            <DialogCreateSupplierContent onClose={onClose} {...props} />
        </DialogContent>
    </Dialog>
);

export default DialogCreateSupplier;
